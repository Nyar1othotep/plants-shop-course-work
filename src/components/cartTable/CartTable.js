import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import setContent from "utils/setContent";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect, useMemo, memo } from "react";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import { useDispatch } from "react-redux";
import { removeToOrderAndDelivery } from "store/slices/toOrderSlice";
import { setItemId, setItemCategory } from "store/slices/itemSlice";
import { setToOrder } from "store/slices/toOrderSlice";

const CartTable = memo(({ handelClick, setTotalPrice }) => {
   const dispatch = useDispatch();
   const { userUID } = useAuth();
   const [items, setItems] = useState([]);
   const usersCartCollectionRef = collection(db, "usersCart");
   const q = query(usersCartCollectionRef, where("userID", "==", userUID));

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
      const recievedData = data.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }));
      setItems((items) => recievedData);
      setOrder(recievedData);
   };

   const setOrder = (data) => {
      const array = [];
      data.forEach((element) => {
         const {
            itemID,
            itemQuantity,
            itemImg,
            itemCategory,
            itemPrice,
            itemName,
            itemDescr,
         } = element;
         const obj = {
            itemID,
            itemTotal: (
               parseFloat(itemQuantity) * parseFloat(itemPrice)
            ).toFixed(2),
            itemQuantity,
            itemImg,
            itemCategory,
            itemPrice,
            itemName,
            itemDescr,
         };
         array.push(obj);
      });

      dispatch(
         setToOrder({
            userUID: userUID,
            orderArray: array,
         })
      );
   };

   const deleteItem = async (id) => {
      try {
         const itemDoc = doc(db, "usersCart", id);
         await deleteDoc(itemDoc);
         onRequest();
         handelClick(userUID);
         alert("Товар удален из корзины");
         dispatch(removeToOrderAndDelivery());
      } catch (error) {
         console.error(error.message);
      }
   };

   const onRemove = (itemID) => {
      if (
         window.confirm("Вы уверены, что хотите удалить из корзины этот товар?")
      )
         deleteItem(itemID);
   };

   const renderItems = (arr) => {
      let total = 0;

      if (arr.length === 0) {
         setTotalPrice(0);
         return (
            <div className="cart-page__empty">
               <p className="cart-page__empty-text">Ваша корзина пуста</p>
               <div className="cart-page__btns">
                  <Link to={"/catalog"}>
                     <button className="cart-page__btn plant-item__btn btn btn--border">
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
      const items = arr.map((item) => {
         total += parseFloat((item.itemQuantity * item.itemPrice).toFixed(2));
         return (
            <li className="table__item item-table" key={item.id}>
               <Link
                  to={"/catalog"}
                  className="item-table__img"
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
                  }}
               >
                  <img src={item.itemImg} alt={item.itemName} />
               </Link>
               <div className="item-table__right">
                  <div className="item-table__name">
                     <div className="item-table__title">{item.itemName}</div>
                     <div className="item-table__descr">
                        {item.itemDescr.substring(0, 80) + "..."}
                     </div>
                  </div>
                  <div className="item-table__price">{item.itemPrice}₽</div>
                  <div className="item-table__quantity">
                     {item.itemQuantity}
                  </div>
                  <div className="item-table__total">
                     {(item.itemQuantity * item.itemPrice).toFixed(2)}₽
                  </div>
                  <div
                     className="item-table__remove-icon"
                     tabIndex={0}
                     onClick={() => onRemove(item.id)}
                     onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                           onRemove(item.id);
                        }
                     }}
                  >
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </div>
               </div>
            </li>
         );
      });

      setTotalPrice(total);
      return <ul className="table__list">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return <div className="table">{elements}</div>;
});

export default CartTable;
