import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../../firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import setContent from "utils/setContent";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import svg from "../../resourses/svg/sprites.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";

const MyOrdersList = () => {
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const { userUID } = useAuth();
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const q = query(
      usersOrderCollectionRef,
      where("userUID", "==", userUID),
      orderBy("date", "desc"),
		orderBy("time", "desc")
   );

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

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

   const renderItems = (arr) => {
      let total = 0;

      if (arr.length === 0) {
         return (
            <div className="my-orders-list-table__empty">
               FUCKING NOTHING, YOU`RE LITTLE BITCH!!!!!
            </div>
         );
      }

      const items = arr.map((item, i) => {
         item.orderArray.map((item) => {
            return (total += parseInt(item.itemTotal));
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
                        Total Amount: <span>${total}</span>
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
            </li>
         );
      });

      return <ul className="my-orders-list-table__list">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return <div className="my-orders-list-table">{elements}</div>;
};

export default MyOrdersList;
