import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../../firebase";
import {
   collection,
   query,
   where,
   orderBy,
   deleteDoc,
   doc,
   updateDoc,
   increment,
} from "firebase/firestore";
import setContent from "utils/setContent";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import svg from "../../resourses/svg/sprites.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const MyOrdersList = () => {
   const alert = useAlert();
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const [filter, setFilter] = useState("desc");
   const { userUID } = useAuth();
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
   }, [filter]);

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

   const updateItems = async (orderArray) => {
      const array = await orderArray;
      try {
         array.forEach(async (item) => {
            const itemDoc = doc(db, "items", item.itemID);
            const updateFields = {
               numberOfOrders: increment(-item.itemQuantity),
               quantity: increment(item.itemQuantity),
            };
            await updateDoc(itemDoc, updateFields);
         });
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const deleteItem = async (id, orderArray) => {
      try {
         const itemDoc = doc(db, "usersOrder", id);
         await deleteDoc(itemDoc);
         updateItems(orderArray);
         onRequest();
         alert.success("Товар удален из заказов");
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const onDetails = (itemID, itemCategory) => {
      dispatch(
         setItemId({
            id: itemID,
         })
      );
      dispatch(
         setItemCategory({
            category: itemCategory,
         })
      );
      navigate("/catalog");
   };

   const renderItems = (arr) => {
      if (arr.length === 0) {
         return (
            <div className="my-orders-list-table__empty cart-page__empty">
               <p className="my-orders-list-table__empty-text cart-page__empty-text">
                  Вы еще ничего не заказывали
               </p>
               <div className="my-orders-list-table__btns cart-page__btns">
                  <Link to={"/catalog"}>
                     <button className="my-orders-list-table__btn cart-page__btn plant-item__btn btn btn--border">
                        <p>Перейти в каталог</p>
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
         let total = 0;

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
                        ID заказа: {item.id}
                     </div>
                     <div className="item-my-orders-list-table__date-time">
                        <span>{item.date}</span>
                        <span>{item.time}</span>
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__row">
                     <div className="item-my-orders-list-table__quantity">
                        Количество: <span>{item.orderArray.length}</span>
                     </div>
                     <div className="item-my-orders-list-table__total">
                        Общая сумма: <span>{total.toFixed(2)}₽</span>
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
                        <p>Подробности</p>
                        <svg>
                           <use href={`${svg}#order-btn-arrow`}></use>
                        </svg>
                     </button>
                     <div className="item-my-orders-list-table__status">
                        Статус: <span>{item.status}</span>
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
                        <th>Изоб.</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Сумма</th>
                     </tr>
                  </thead>
                  <tbody>
                     {item.orderArray.map((item, i) => {
                        return (
                           <tr
                              key={i}
                              tabIndex={0}
                              onClick={() =>
                                 onDetails(item.itemID, item.itemCategory)
                              }
                              onKeyPress={(e) => {
                                 if (e.key === " " || e.key === "Enter") {
                                    onDetails(item.itemID, item.itemCategory);
                                 }
                              }}
                           >
                              <td>{i + 1}</td>

                              <td>
                                 <img src={item.itemImg} alt={item.itemName} />
                              </td>
                              <td>{item.itemName.substring(0, 15) + "..."}</td>
                              <td>{item.itemPrice}₽</td>
                              <td>{item.itemQuantity}</td>
                              <td>{item.itemTotal}₽</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               {item.status === "Ожидание отправки" ? (
                  <button
                     className="item-my-orders-list-table__btn item-my-orders-list-table__btn-cancel btn btn--border"
                     onClick={() => {
                        if (
                           window.confirm(
                              "Вы уверены, что хотите отменить этот заказ?"
                           )
                        )
                           deleteItem(item.id, item.orderArray);
                     }}
                  >
                     <p>Отменить заказ</p>
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
               <p>Сортировать по:</p>
            </label>
            <select
               name="filter"
               id="filter"
               value={filter}
               onChange={(e) => {
                  setFilter((filter) => e.target.value);
               }}
            >
               <option value="desc">По убыванию</option>
               <option value="asc">По возрастанию</option>
            </select>
         </div>
         {elements}
      </div>
   );
};

export default MyOrdersList;
