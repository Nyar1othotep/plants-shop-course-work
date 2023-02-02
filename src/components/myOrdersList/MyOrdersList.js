import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../../firebase";
import {
   collection,
   query,
   where,
   orderBy,
   deleteDoc,
   doc,
} from "firebase/firestore";
import setContent from "utils/setContent";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import svg from "../../resourses/svg/sprites.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";
import { Link } from "react-router-dom";

const MyOrdersList = () => {
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const [filter, setFilter] = useState("desc");
   const { userUID } = useAuth();
   const shouldLog = useRef(true);
   const [isDelete, setIsDelete] = useState(false);
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const q = query(
      usersOrderCollectionRef,
      where("userUID", "==", userUID),
      orderBy("date", filter),
      orderBy("time", filter)
   );

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [isDelete, filter]);

   const onRequest = () => {
      request(q)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      setItems((items) =>
         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
   };

   const itemRefs = useRef([]);

   const focusOnItem = (id) => {
      itemRefs.current[id].classList.toggle("active");
   };

   const handleClick = (e) => {
      e.currentTarget.classList.toggle("active");
   };

   const deleteItem = async (id) => {
      shouldLog.current = true;
      try {
         const itemDoc = doc(db, "usersOrder", id);
         await deleteDoc(itemDoc);
         alert("Item has been removed from orders");
         setIsDelete((isDelete) => !isDelete);
      } catch (error) {
         console.error(error.message);
      }
   };

   const renderItems = (arr) => {
      let total = 0;

      if (arr.length === 0) {
         return (
            <div className="my-orders-list__empty cart-page__empty">
               <p className="my-orders-list__empty-text cart-page__empty-text">
                  You haven't ordered anything yet
               </p>
               <div className="my-orders-list__btns cart-page__btns">
                  <Link to={"/catalog"}>
                     <button className="my-orders-list__btn cart-page__btn plant-item__btn btn btn--border">
                        <p>Go to catalog</p>
                        <svg>
                           <use href={`${svg}#sharp-arrow-down`}></use>
                        </svg>
                     </button>
                  </Link>
               </div>
            </div>
         );
      }

      const items = arr.map((item, i) => {
         item.orderArray.map((item) => {
            return (total += parseFloat(item.itemTotal));
         });

         return (
            <li
               className="my-orders-list-table__item item-my-orders-list-table"
               key={item.id}
            >
               <div className="item-my-orders-list-table__item">
                  <div className="item-my-orders-list-table__row">
                     <div className="item-my-orders-list-table__order-id">
                        Order ID: {item.id}
                     </div>
                     <div className="item-my-orders-list-table__date-time">
                        <span>{item.date}</span>
                        <span>{item.time}</span>
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__row">
                     <div className="item-my-orders-list-table__quantity">
                        Quantity: <span>{item.orderArray.length}</span>
                     </div>
                     <div className="item-my-orders-list-table__total">
                        Total Amount: <span>${total.toFixed(2)}</span>
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__row">
                     <button
                        className="item-my-orders-list-table__btn btn btn--border"
                        onClick={(e) => {
                           focusOnItem(i);
                           handleClick(e);
                        }}
                     >
                        <p>Details</p>
                        <svg>
                           <use href={`${svg}#order-btn-arrow`}></use>
                        </svg>
                     </button>
                     <div className="item-my-orders-list-table__status">
                        Status: <span>{item.status}</span>
                     </div>
                  </div>
               </div>
               <table
                  className="item-my-orders-list-table__order-list"
                  ref={(el) => (itemRefs.current[i] = el)}
               >
                  <thead>
                     <tr>
                        <th>№</th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                     </tr>
                  </thead>
                  <tbody>
                     {item.orderArray.map((item, i) => {
                        return (
                           <tr
                              key={i}
                              onClick={() => {
                                 dispatch(
                                    setItemId({
                                       id: item.itemID,
                                    })
                                 );
                                 dispatch(
                                    setItemCategory({
                                       category: item.itemCategory,
                                    })
                                 );
                                 navigate("/catalog");
                              }}
                           >
                              <td>{i + 1}</td>

                              <td>
                                 <img src={item.itemImg} alt={item.itemName} />
                              </td>
                              <td>{item.itemName.substring(0, 15) + "..."}</td>
                              <td>${item.itemPrice}</td>
                              <td>{item.itemQuantity}</td>
                              <td>${item.itemTotal}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               {item.status === "Waiting for sending" ? (
                  <button
                     className="item-my-orders-list-table__btn item-my-orders-list-table__btn-cancel btn btn--border"
                     onClick={() => {
                        if (
                           window.confirm(
                              "Are you sure you want to cancel this order?"
                           )
                        )
                           deleteItem(item.id);
                     }}
                  >
                     <p>Cancel order</p>
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </button>
               ) : null}
            </li>
         );
      });

      return <ul className="my-orders-list-table__list">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="my-orders-list-table">
         <div className="my-orders-list-table__filter">
            <label htmlFor="filter">
               <svg>
                  <use href={`${svg}#filter`}></use>
               </svg>
               <p>Filter by:</p>
            </label>
            <select
               name="filter"
               id="filter"
               value={filter}
               onChange={(e) => {
                  setFilter((filter) => e.target.value);
               }}
            >
               <option value="desc">Descending</option>
               <option value="asc">Ascending</option>
            </select>
         </div>
         {elements}
      </div>
   );
};

export default MyOrdersList;
