import item from "../../resourses/img/item.png";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where } from "firebase/firestore";
import setContent from "utils/setContent";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";

const MyOrdersList = () => {
   const [items, setItems] = useState([]);
   const [subItems, setSubItems] = useState([]);
   const { userUID } = useAuth();
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const q = query(usersOrderCollectionRef, where("userUID", "==", userUID));

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
      setSubItems((subItems) =>
         data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .map((item) => {
               return item.orderArray;
            })
      );
   };

   const renderItems = (arr, subArr) => {
      if (arr.length === 0) {
         return (
            <div className="my-orders-list-table__empty">
               FUCKING NOTHING, YOU`RE LITTLE BITCH!!!!!
            </div>
         );
      }

		let items;

		// перезаписал на полседний у которого в массиве 5 элементов и еще надо дату и время вывести
      subArr.map((item, i) => {
         items = item.map((el, i) => {
            return (
               <li
                  className="my-orders-list-table__item item-my-orders-list-table table__item item-table"
                  key={el.i}
               >
                  <div className="item-my-orders-list-table__img item-table__img">
                     <img src={el.itemImg} alt={el.itemName} />
                  </div>
                  <div className="item-my-orders-list-table__right item-table__right">
                     <div className="item-my-orders-list-table__name item-table__name">
                        <div className="item-my-orders-list-table__title item-table__title">
                           {el.itemName}
                        </div>
                        <div className="item-my-orders-list-table__descr item-table__descr">
                           {el.itemDescr}
                        </div>
                     </div>
                     <div className="item-my-orders-list-table__price item-table__price">
                        ${el.itemPrice}
                     </div>
                     <div className="item-my-orders-list-table__quantity item-table__quantity">
                        {el.itemQuantity}
                     </div>
                     <div className="item-my-orders-list-table__total item-table__total">
                        ${el.itemTotal}
                     </div>
                     <div className="item-my-orders-list-table__date-info">
                        <div className="item-my-orders-list-table__date">
                           01/01/2023
                        </div>
                        <div className="item-my-orders-list-table__time">
                           10:47
                        </div>
                     </div>
                     <div className="item-my-orders-list-table__order-status">
                        Sent
                     </div>
                  </div>
               </li>
            );
         });
      });

      return (
         <ul className="my-orders-list-table__list table__list">{items}</ul>
      );
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items, subItems), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="my-orders-list-table table">
         <ul className="my-orders-list-table__list table__list">{elements}</ul>
      </div>
   );
};

export default MyOrdersList;
