import Total from "../total/Total";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import { useAuth } from "hooks/useAuth.hook";
import setContent from "utils/setContent";
import svg from "../../resourses/svg/sprites.svg";
import { Navigate } from "react-router-dom";

const CartPage = () => {
   const { isAuth, userUID } = useAuth();
   const [items, setItems] = useState([]);
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
			setIsDelete(isDelete => !isDelete)
      } catch (error) {
         console.error(error.message);
      }
   };

   const renderItems = (arr) => {
      const items = arr.map((item, i) => {
         return (
            <li className="table__item item-table" key={item.i}>
               <div className="item-table__img">
                  <img src={item.itemImg} alt={item.itemName} />
               </div>
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
                     {/* <div>
                        <svg>
                           <use href={`${svg}#minus`}></use>
                        </svg>
                        <input
                           type="number"
                           name="quantity"
                           id="quantity"
                           min={1}
                        />
                        <svg>
                           <use href={`${svg}#plus`}></use>
                        </svg>
                     </div> */}
                  </div>
                  <div className="item-table__total">${item.itemPrice}</div>
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

   return isAuth ? (
      <div className="cart-page">
         <div className="cart-page__container _container">
            <div className="cart-page__body">
               <div className="cart-page__heading">
                  <h2>Cart</h2>
               </div>
               <div className="cart-page__row">
                  <div className="table">{elements}</div>
                  <Total />
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default CartPage;
