import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { useSelector, useDispatch } from "react-redux";
import { setOrderId } from "store/slices/orderSlice";

const OrdersList = () => {
   const dispatch = useDispatch();
   const { orderId } = useSelector((state) => state.order);
   const [items, setItems] = useState([]);
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const q = query(
      usersOrderCollectionRef,
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
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItems((items) => gotData);
   };

   const itemRefs = useRef([]);

   const focusOnItem = (id) => {
      itemRefs.current.forEach((item) => item.classList.remove("active"));
      itemRefs.current[id].classList.add("active");
      itemRefs.current[id].focus();
   };

   const renderItems = (arr) => {
      const clazz = "orders-history__item item-orders-history";

      const items = arr.map((item, i) => {
         return (
            <tr
               className={orderId === item.id ? clazz + " active" : clazz}
               key={item.id}
               tabIndex={0}
               ref={(el) => (itemRefs.current[i] = el)}
               onClick={(e) => {
                  dispatch(
                     setOrderId({
                        orderId: item.id,
                     })
                  );
                  focusOnItem(i);
               }}
               onKeyPress={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                     dispatch(
                        setOrderId({
                           orderId: item.id,
                        })
                     );
                     focusOnItem(i);
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
      <div className="orders-list">
         <h3>Заказы</h3>
         <div className="orders-history__table">{elements}</div>
      </div>
   );
};

export default OrdersList;
