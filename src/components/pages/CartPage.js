import Total from "../total/Total";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import setContent from "utils/setContent";
import svg from "../../resourses/svg/sprites.svg";
import { Navigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";

const CartPage = () => {
   const dispatch = useDispatch();
   const { isAuth, userUID } = useAuth();
   const [items, setItems] = useState([]);
   const [total, setTotal] = useState(null);
   const [isDelete, setIsDelete] = useState(false);
   const usersCartCollectionRef = collection(db, "usersCart");
   const q = query(usersCartCollectionRef, where("userID", "==", userUID));

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [isDelete]);

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

   const deleteItem = async (id) => {
      try {
         const itemDoc = doc(db, "usersCart", id);
         await deleteDoc(itemDoc);
         alert("Item has been removed from cart");
         setIsDelete((isDelete) => !isDelete);
      } catch (error) {
         console.error(error.message);
      }
   };

   const renderItems = (arr) => {
      setTotal((total) => 0);

      if (arr.length === 0) {
         return (
            <div className="cart-page__empty">
               <p className="cart-page__empty-text">Your cart is empty</p>
               <div className="cart-page__btns">
                  <Link to={"/catalog"}>
                     <button className="cart-page__btn plant-item__btn btn btn--border">
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
         setTotal(
            (total) =>
               (total += parseInt(
                  (item.itemQuantity * item.itemPrice).toFixed(2)
               ))
         );
         return (
            <li className="table__item item-table" key={i}>
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
                  <div className="item-table__price">${item.itemPrice}</div>
                  <div className="item-table__quantity quantity">
                     {item.itemQuantity}
                  </div>
                  <div className="item-table__total">
                     ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                  </div>
                  <div
                     className="item-table__remove-icon"
                     onClick={() => deleteItem(item.id)}
                  >
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </div>
               </div>
            </li>
         );
      });

      return <ul className="table__list">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   const totals = useMemo(() => {
      return <Total total={total} />;
      // eslint-disable-next-line
   }, [total]);

   return isAuth ? (
      <div className="cart-page">
         <div className="cart-page__container _container">
            <div className="cart-page__body">
               <div className="cart-page__heading">
                  <h2>Cart</h2>
               </div>
               <div className="cart-page__row">
                  <div className="table">{elements}</div>
                  {totals}
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default CartPage;
