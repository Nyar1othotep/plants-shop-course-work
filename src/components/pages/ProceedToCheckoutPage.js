import ProceedToCheckoutForm from "../proceedToCheckoutForm/ProceedToCheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { setToDelivery } from "store/slices/toOrderSlice";
import { db } from "../../firebase";
import {
   collection,
   addDoc,
   deleteDoc,
   query,
   where,
   doc,
   updateDoc,
   increment,
} from "firebase/firestore";
import { store } from "store";
import { useAuth } from "hooks/useAuth.hook";
import { useHttp } from "hooks/http.hook";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { removeToCart } from "store/slices/toCartSlice";
import { removeToOrderAndDelivery } from "store/slices/toOrderSlice";
import { useAlert } from "react-alert";
import Helmet from "react-helmet";
import Popup from "reactjs-popup";
import BuyForm from "components/buyForm/BuyFrom";

const ProceedToCheckoutPage = ({ handelClick }) => {
   const alert = useAlert();
   const dispatch = useDispatch();
   const { isAuth, userUID } = useAuth();
   const navigate = useNavigate();
   const [itemsID, setItemsID] = useState([]);
   const [isPay, setIsPay] = useState(false);
   const [isBuy, setIsBuy] = useState(false);
   const [orderData, setOrderData] = useState({});
   const { orderArray } = useSelector((state) => state.toOrder);
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const usersCartCollectionRef = collection(db, "usersCart");
   const q = query(usersCartCollectionRef, where("userID", "==", userUID));

   const { request } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      request(q).then(onItemsLoaded);
   };

   const onItemsLoaded = (data) => {
      const loadedData = data.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }));
      setItemsID((items) => loadedData.map((item) => item.id));
   };

   const addToCart = async () => {
      try {
         await addDoc(usersOrderCollectionRef, store.getState().toOrder);
         alert.success("Товар успешно заказан!");
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const deleteItems = async (itemsID) => {
      const items = await itemsID;
      try {
         for (const itemID of items) {
            const itemDoc = doc(db, "usersCart", itemID);
            await deleteDoc(itemDoc);
         }
         handelClick(userUID);
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const updateItems = async (orderArray) => {
      const array = await orderArray;
      try {
         array.forEach(async (item) => {
            const itemDoc = doc(db, "items", item.itemID);
            const updateFields = {
               numberOfOrders: increment(item.itemQuantity),
               quantity: increment(-item.itemQuantity),
            };
            await updateDoc(itemDoc, updateFields);
         });
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const handleProceedToCheckout = (
      country,
      office,
      index,
      firstAndLastName,
      phone
   ) => {
      setIsPay((isPay) => true);
      let obj = {
         country,
         office,
         index,
         firstAndLastName,
         phone,
      };
      setOrderData((orderData) => obj);
   };

   const handleBuy = () => {
      document.body.style.overflow = "auto";
      dispatch(
         setToDelivery({
            country: orderData.country,
            office: orderData.office,
            index: orderData.index,
            firstAndLastName: orderData.firstAndLastName,
            phone: orderData.phone,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            status: "Ожидание отправки",
         })
      );

      addToCart();
      updateItems(orderArray);
      deleteItems(itemsID);
      dispatch(removeToCart());
      dispatch(removeToOrderAndDelivery());
      navigate("/user/profile");
   };

   return isAuth && orderArray !== [] && orderArray !== null ? (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - оформление товара`}
            />
            <title>Plants shop - оформление товара</title>
         </Helmet>
         <div className="proceed-to-checkout-page">
            <div className="proceed-to-checkout-page__container _container">
               <div className="proceed-to-checkout-page__body">
                  <ProceedToCheckoutForm
                     handleClick={handleProceedToCheckout}
                  />
                  <Popup
                     open={isPay}
                     position="top left"
                     lockScroll
                     closeOnEscape
                     modal
                  >
                     {(close) => (
                        <BuyForm
                           onClose={close}
                           handleBuy={handleBuy}
                           setIsBuy={setIsBuy}
                           isBuy={isBuy}
                        />
                     )}
                  </Popup>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default ProceedToCheckoutPage;
