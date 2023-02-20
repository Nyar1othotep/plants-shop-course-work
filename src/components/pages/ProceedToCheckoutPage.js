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

const ProceedToCheckoutPage = ({ handelClick }) => {
   const dispatch = useDispatch();
   const { isAuth, userUID } = useAuth();
   const navigate = useNavigate();
   const [itemsID, setItemsID] = useState([]);
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
      } catch (error) {
         console.error(error.message);
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
         console.error(error.message);
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
         console.error(error.message);
      }
   };

   const handleProceedToCheckout = (
      country,
      office,
      index,
      firstAndLastName,
      phone
   ) => {
      dispatch(
         setToDelivery({
            country: country,
            office: office,
            index: index,
            firstAndLastName: firstAndLastName,
            phone: phone,
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
      <div className="proceed-to-checkout-page">
         <div className="proceed-to-checkout-page__container _container">
            <div className="proceed-to-checkout-page__body">
               <ProceedToCheckoutForm handleClick={handleProceedToCheckout} />
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default ProceedToCheckoutPage;
