import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Skeleton from "components/skeleton/Skeleton";
import Spinner from "components/spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setItemId, setItemCategory } from "store/slices/itemSlice";

const OrderInfo = () => {
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const { orderId } = useSelector((state) => state.order);
   const [items, setItems] = useState({});
   const [process, setProcess] = useState("waiting");
   const [itemStatus, setItemStatus] = useState("Ожидание отправки");
   const docRef = orderId ? doc(db, "usersOrder", orderId) : null;

   useEffect(() => {
      if (orderId) {
         onRequest();
      }
      // eslint-disable-next-line
   }, [orderId]);

   const onRequest = async () => {
      setProcess((process) => "loading");
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
         setItems((items) => docSnap.data());
         setItemStatus((itemStatus) => docSnap.data().status);
         setProcess((process) => "confirmed");
      } else {
         setProcess((process) => "waiting");
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

   const updateStatus = async (itemID, status) => {
      console.log(status);
      if (itemID) {
         const itemDoc = doc(db, "usersOrder", itemID);
         const updateFields = {
            status: status,
         };
         await updateDoc(itemDoc, updateFields);
      }
   };

   return (
      <div className="order-info">
         {!orderId || process === "waiting" ? (
            <Skeleton />
         ) : process === "loading" ? (
            <Spinner />
         ) : process === "confirmed" ? (
            <>
               <h3>Заказ: {orderId}</h3>
               <ul className="order-info__row">
                  <li className="order-info__item">
                     <span>Город:</span> {items.country}
                  </li>
                  <li className="order-info__item">
                     <span>Квартира:</span> {items.office}
                  </li>
                  <li className="order-info__item">
                     <span>Индекс:</span> {items.index}
                  </li>
                  <li className="order-info__item">
                     <span>Номер телефона:</span> {items.phone}
                  </li>
                  <li className="order-info__item">
                     <span>Имя и фамилия:</span> {items.firstAndLastName}
                  </li>
                  <li className="order-info__item">
                     <span>ID пользователя:</span> {items.userUID}
                  </li>
                  <li className="order-info__item">
                     <span>Время заказа:</span> {items.time}
                  </li>
                  <li className="order-info__item">
                     <span>Дата заказа:</span> {items.date}
                  </li>
                  <li className="order-info__item">
                     <div className="order-info__select">
                        <label htmlFor="itemStatus">
                           <p>Статус заказа:</p>
                        </label>
                        <select
                           name="itemStatus"
                           id="itemStatus"
                           value={itemStatus}
                           onChange={(e) => {
                              setItemStatus((itemStatus) => e.target.value);
                              updateStatus(orderId, e.target.value);
                           }}
                        >
                           <option value="Ожидание отправки">
                              Ожидание отправки
                           </option>
                           <option value="Отправлен">Отправлен</option>
                           <option value="Доставлен">Доставлен</option>
                        </select>
                     </div>
                  </li>
               </ul>
               <table
                  className="item-my-orders-list-table__order-list"
                  style={{ display: "block" }}
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
                     {items.orderArray.map((item, i) => {
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
            </>
         ) : null}
      </div>
   );
};

export default OrderInfo;
