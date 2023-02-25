import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, limit, query, orderBy } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderId } from "store/slices/orderSlice";

const OrdersHistory = () => {
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const q = query(
      usersOrderCollectionRef,
      orderBy("date", "desc"),
      orderBy("time", "desc"),
      limit(5)
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
      const gotData = data.docs
         .map((doc) => ({ ...doc.data(), id: doc.id }))
         .reverse();
      setItems((items) => gotData);
   };

   const renderItems = (arr) => {
      if (arr.length === 0) {
         return <p>Заказов еще нет</p>;
      }

      const items = arr.map((item) => {
         return (
            <tr
               className="orders-history__item item-orders-history"
               key={item.id}
               tabIndex={0}
               onClick={() => {
                  dispatch(
                     setOrderId({
                        orderId: item.id,
                     })
                  );
                  navigate(`/orders`);
               }}
               onKeyPress={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                     dispatch(
                        setOrderId({
                           orderId: item.id,
                        })
                     );
                     navigate(`/orders`);
                  }
               }}
            >
               <td className="item-orders-history__date">{item.date}</td>
               <td className="item-orders-history__time">{item.time}</td>
               <td className="item-orders-history__id">ID заказа: {item.id}</td>
            </tr>
         );
      });

      return (
         <table className="orders-history__row">
            <tbody>{items}</tbody>
         </table>
      );
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="orders-history">
         <h3>История заказов</h3>
         <div className="orders-history__table">{elements}</div>
         <div
            className="orders-history__all-orders"
            tabIndex={0}
            onClick={() => {
               navigate(`/orders`);
            }}
            onKeyPress={(e) => {
               if (e.key === " " || e.key === "Enter") {
                  navigate(`/orders`);
               }
            }}
         >
            Перейти ко всем заказам
         </div>
      </div>
   );
};

export default OrdersHistory;
