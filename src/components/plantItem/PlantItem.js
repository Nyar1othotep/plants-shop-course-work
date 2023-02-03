import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, addDoc } from "firebase/firestore";
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
   const [item, setItem] = useState([]);
   const [quantity, setQuantity] = useState(1);
   const itemsCollectionRef = collection(db, "items");
   const usersCartCollectionRef = collection(db, "usersCart");
   const q = query(itemsCollectionRef, where("itemID", "==", parseInt(id)));

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
      request(q)
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
         alert("This product was added to the cart");
      } catch (error) {
         console.error(error.message);
      }
   };

   const onDecreace = () => {
      quantity > 1
         ? setQuantity((quantity) => parseInt(quantity - 1))
         : alert("You can`t decreace anymore.");
   };

   const onIncreace = (itemQuantity) => {
      quantity < itemQuantity
         ? setQuantity((quantity) => parseInt(quantity + 1))
         : alert("You can`t increace anymore.");
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
                              <td>Name:</td>
                              <td>{item.category}</td>
                           </tr>
                           <tr>
                              <td>Plant type:</td>
                              <td>{item["plant-type"]}</td>
                           </tr>
                           <tr>
                              <td>Place:</td>
                              <td>{item.place}</td>
                           </tr>
                           <tr>
                              <td>Height:</td>
                              <td>{item["height-width"]}</td>
                           </tr>
                           <tr>
                              <td>Light:</td>
                              <td>{item.light}</td>
                           </tr>
                           <tr>
                              <td>Room temperature:</td>
                              <td>{item["room-temperature"]}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="plant-item__price">
                     Price: <span>${item.price}</span>
                  </div>
                  <div className="plant-item__left">
                     Quantity of goods: {item.quantity}
                  </div>
                  {item.quantity === 0 ? (
                     <div className="plant-item__not-available">
                        Not available
                     </div>
                  ) : (
                     <div className="plant-item__bottom">
                        <div className="plant-item__quantity quantity">
                           <label>Quantity:</label>
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
                                    "You need to login or create an account at first!"
                                 );
                              } else {
                                 addToCart();
                              }
                           }}
                        >
                           <p>Add to cart</p>
                           <svg>
                              <use href={`${svg}#add-to-cart`}></use>
                           </svg>
                        </button>
                     </div>
                  )}
               </div>
               <div className="plant-item__img">
                  <img src={item.img} alt="Alocasia 'Zebrina'" />
               </div>
            </div>
         )}
      </>
   );
};

export default PlantItem;
