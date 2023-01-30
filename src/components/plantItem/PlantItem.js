import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where, addDoc } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth.hook";
import { setToCart, setitemQuantity } from "store/slices/toCartSlice";

const PlantItem = () => {
   const dispatch = useDispatch();
   const { id } = useSelector((state) => state.item);
   const toCartObject = useSelector((state) => state.toCart);
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
   }, [id]);

   useEffect(() => {
      if (isAuth) {
         dispatch(
            setitemQuantity({
               itemQuantity: quantity,
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

   const onItemLoaded = (data) => {
      const receivedData = data.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }));
      setItem((item) => receivedData);
      if (isAuth) {
         dispatch(
            setToCart({
               userID: userUID,
               itemID: receivedData.map((item) => item.id).join(),
               itemImg: receivedData.map((item) => item.img).join(),
               itemName: receivedData.map((item) => item.name).join(),
               itemDescr: receivedData.map((item) => item.description).join(),
               itemPrice: receivedData.map((item) => item.price).join(),
               itemQuantity: quantity,
            })
         );
      }
   };

	// Надо исправить. toCartObject вызывается при загрузки документа, а надо чтобы когда выполняется эта функция. useEffect не поможет
   const addToCart = async () => {
      await addDoc(usersCartCollectionRef, toCartObject);
   };

   const renderItems = (arr) => {
      const items = arr.map((item) => {
         return (
            <div className="plant-item" key={item.id}>
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
                  <div className="plant-item__bottom">
                     <div className="plant-item__quantity quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <div>
                           <svg
                              onClick={() =>
                                 setQuantity((quantity) => quantity - 1)
                              }
                           >
                              <use href={`${svg}#minus`}></use>
                           </svg>
                           <input
                              type="number"
                              name="quantity"
                              id="quantity"
                              min={1}
                              max={item.quantity}
                              value={quantity}
                              placeholder="1"
                              onChange={(e) =>
                                 setQuantity((quantity) => e.target.value)
                              }
                           />
                           <svg
                              onClick={() =>
                                 setQuantity((quantity) => quantity + 1)
                              }
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
                              alert("The item has been added to your cart!");
                           }
                        }}
                     >
                        <p>Add to cart</p>
                        <svg>
                           <use href={`${svg}#add-to-cart`}></use>
                        </svg>
                     </button>
                  </div>
               </div>
               <div className="plant-item__img">
                  <img src={item.img} alt="Alocasia 'Zebrina'" />
               </div>
            </div>
         );
      });

      return <>{items}</>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(item), item);
      // этот прикол надо будет исправить, если возникнут проблемы с долгим перерендорингом
      // eslint-disable-next-line
   }, [process, quantity]);

   return <>{elements}</>;
};

export default PlantItem;
