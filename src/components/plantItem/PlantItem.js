import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
   collection,
   query,
   where,
   addDoc,
   getDoc,
   doc,
} from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth.hook";
import { setToCart, setitemQuantity } from "store/slices/toCartSlice";
import { store } from "store";
import Spinner from "components/spinner/Spinner";
import ErrorMessage from "components/errorMessage/ErrorMessage";

const PlantItem = ({ handelClick, isReAuth }) => {
   const dispatch = useDispatch();
   const { id } = useSelector((state) => state.item);
   const [item, setItem] = useState({});
   const [quantity, setQuantity] = useState(1);
   const itemRef = doc(db, "items", id);
   const usersCartCollectionRef = collection(db, "usersCart");

   const { request, process, setProcess } = useHttp();
   const { isAuth, userUID } = useAuth();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [id, isReAuth]);

   useEffect(() => {
      if (isAuth) {
         dispatch(
            setitemQuantity({
               itemQuantity: parseInt(quantity),
            })
         );
      }
      // eslint-disable-next-line
   }, [quantity]);

   const onRequest = () => {
      request(itemRef, true)
         .then(onItemLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemLoaded = async (data) => {
      const receivedData = await data.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }))[0];
      setQuantity((quantity) => 1);
      setItem((item) => receivedData);
      if (isAuth) {
         dispatch(
            setToCart({
               userID: userUID,
               itemID: receivedData.id,
               itemImg: receivedData.img,
               itemName: receivedData.name,
               itemDescr: receivedData.description,
               itemPrice: receivedData.price,
               itemCategory: receivedData.category,
               itemQuantity: quantity,
            })
         );
      }
   };

   const addToCart = async () => {
      try {
         await addDoc(usersCartCollectionRef, store.getState().toCart);
         handelClick(userUID);
         alert("Товар добавлен в корзину");
      } catch (error) {
         console.error(error.message);
      }
   };

   const onDecreace = () => {
      quantity > 1
         ? setQuantity((quantity) => parseInt(quantity - 1))
         : alert("Вы не можете больше уменьшаться.");
   };

   const onIncreace = (itemQuantity) => {
      quantity < itemQuantity
         ? setQuantity((quantity) => parseInt(quantity + 1))
         : alert("Вы больше не можете увеличивать.");
   };

   return (
      <>
         {process === "loading" ? (
            <Spinner />
         ) : process === "error" ? (
            <ErrorMessage />
         ) : (
            <div className="plant-item">
               <div className="plant-item__content">
                  <h3 className="plant-item__title">{item.name}</h3>
                  <div className="plant-item__info">
                     <div className="plant-item__description">
                        {item.description}
                     </div>
                     <table className="plant-item__characteristics">
                        <tbody>
                           <tr>
                              <td>Имя:</td>
                              <td>{item.category}</td>
                           </tr>
                           <tr>
                              <td>Тип растения:</td>
                              <td>{item["plant-type"]}</td>
                           </tr>
                           <tr>
                              <td>Место:</td>
                              <td>{item.place}</td>
                           </tr>
                           <tr>
                              <td>Высота:</td>
                              <td>{item["height-width"]}</td>
                           </tr>
                           <tr>
                              <td>Свет:</td>
                              <td>{item.light}</td>
                           </tr>
                           <tr>
                              <td>Комнатная температура:</td>
                              <td>{item["room-temperature"]}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="plant-item__price">
                     Цена: <span>{item.price}₽</span>
                  </div>
                  <div className="plant-item__left">
                     Количество товаров: {item.quantity}
                  </div>
                  {item.quantity === 0 ? (
                     <div className="plant-item__not-available">
                        Нет в наличии
                     </div>
                  ) : (
                     <div className="plant-item__bottom">
                        <div className="plant-item__quantity quantity">
                           <label>Количество:</label>
                           <div>
                              <svg
                                 tabIndex={0}
                                 onClick={onDecreace}
                                 onKeyPress={(e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                       onDecreace();
                                    }
                                 }}
                              >
                                 <use href={`${svg}#minus`}></use>
                              </svg>
                              <span>{quantity}</span>
                              <svg
                                 tabIndex={0}
                                 onClick={() => onIncreace(item.quantity)}
                                 onKeyPress={(e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                       onIncreace(item.quantity);
                                    }
                                 }}
                              >
                                 <use href={`${svg}#plus`}></use>
                              </svg>
                           </div>
                        </div>
                        <button
                           className="plant-item__btn btn btn--border"
                           onClick={() => {
                              if (!isAuth) {
                                 alert(
                                    "Сначала вам необходимо войти или создать учетную запись!"
                                 );
                              } else {
                                 addToCart();
                              }
                           }}
                        >
                           <p>Добавить в корзину</p>
                           <svg>
                              <use href={`${svg}#add-to-cart`}></use>
                           </svg>
                        </button>
                     </div>
                  )}
               </div>
               <div className="plant-item__img">
                  <img src={item.img} alt={item.name} />
               </div>
            </div>
         )}
      </>
   );
};

export default PlantItem;
