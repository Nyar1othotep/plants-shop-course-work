import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import {
   collection,
   deleteDoc,
   doc,
   addDoc,
   updateDoc,
} from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import svg from "../../resourses/svg/sprites.svg";
import Popup from "reactjs-popup";
import ItemChangeForm from "components/itemChangeForm/ItemChangeForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";
import { useAlert } from "react-alert";

const Items = ({ reload, setReload }) => {
   const alert = useAlert();
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const [categories, setCategories] = useState([]);
   const categoriesCollectionRef = collection(db, "categories");
   const itemsCollectionRef = collection(db, "items");

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [reload]);

   const onRequest = () => {
      request(categoriesCollectionRef)
         .then(onCategoriesLoaded)
         .then(() => setProcess("confirmed"));

      request(itemsCollectionRef)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItems((items) => gotData);
   };

   const onCategoriesLoaded = (data) => {
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategories((categories) => gotData);
   };

   const deleteItem = async (id) => {
      try {
         const itemDoc = doc(db, "items", id);
         await deleteDoc(itemDoc).then(() => setReload((reload) => !reload));
         alert.success("Товар удален!");
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const onRemove = (itemID) => {
      if (window.confirm("Вы уверены, что хотите удалить данный товар?"))
         deleteItem(itemID);
   };

   const addNewItem = async (
      description,
      place,
      quantity,
      light,
      price,
      heightWith,
      img,
      category,
      name,
      plantType,
      numberOfOrders,
      id,
      roomTemperature
   ) => {
      try {
         await addDoc(collection(db, "items"), {
            description,
            place,
            quantity: parseInt(quantity),
            light,
            price,
            "height-width": heightWith,
            img,
            category,
            name,
            "plant-type": plantType,
            numberOfOrders: parseInt(numberOfOrders),
            // itemID: parseInt(id),
            "room-temperature": roomTemperature,
         }).then(() => setReload((reload) => !reload));
         alert.success("Товар добавлен!");
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
      }
   };

   const updateItem = async (
      description,
      place,
      quantity,
      light,
      price,
      heightWith,
      img,
      category,
      name,
      plantType,
      numberOfOrders,
      id,
      roomTemperature
   ) => {
      try {
         const itemDoc = doc(db, "items", id);
         const updateFields = {
            description,
            place,
            quantity: parseInt(quantity),
            light,
            price,
            "height-width": heightWith,
            img,
            category,
            name,
            "plant-type": plantType,
            numberOfOrders: parseInt(numberOfOrders),
            "room-temperature": roomTemperature,
         };
         await updateDoc(itemDoc, updateFields).then(() =>
            setReload((reload) => !reload)
         );
         alert.success("Товар изменен!");
      } catch (error) {
         let errors = (function () {
            let index = error.message.indexOf("(");
            return index > -1 ? error.message.slice(index) : error.message;
         })();
         alert.error(errors);
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

   const renderItems = (arr, categoriesArray) => {
      if (categoriesArray.length === 0) {
         return <p>Вам необходимо добавить категорию сначала</p>;
      }
      const items = categoriesArray.map((category) => {
         return (
            <li className="items__column" key={category.id}>
               <h4>{category.category}</h4>
               <ul className="items__list">
                  <li className="items__item item-items add">
                     <Popup
                        trigger={
                           <button className="item-items__content" tabIndex={0}>
                              <svg>
                                 <use href={`${svg}#plus`}></use>
                              </svg>
                           </button>
                        }
                        position="top left"
                        lockScroll
                        closeOnEscape
                        modal
                     >
                        {(close) => (
                           <ItemChangeForm
                              categoriesArray={categoriesArray}
                              handleClick={addNewItem}
                              onClose={close}
                              addForm={true}
                           />
                        )}
                     </Popup>
                  </li>

                  {arr.map((item) => {
                     const clazz = "item-items__inner";
                     return category.category === item.category ? (
                        <li className="items__item item-items" key={item.id}>
                           <div className="item-items__content">
                              <div
                                 className={
                                    item.quantity === 0
                                       ? clazz + " not_available"
                                       : clazz
                                 }
                                 tabIndex={0}
                                 onClick={() =>
                                    onDetails(item.id, item.category)
                                 }
                                 onKeyPress={(e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                       onDetails(item.id, item.category);
                                    }
                                 }}
                              >
                                 <img
                                    className="item-items__img"
                                    src={item.img}
                                    alt={item.name}
                                 />
                                 <div className="item-items__name">
                                    {item.name}
                                 </div>
                                 <div className="item-items__quantity">
                                    {item.quantity}
                                 </div>
                              </div>
                              <div className="item-items__btns">
                                 <Popup
                                    trigger={
                                       <button className="item-items__btn btn btn--border">
                                          Изменить
                                       </button>
                                    }
                                    position="top left"
                                    lockScroll
                                    closeOnEscape
                                    modal
                                 >
                                    {(close) => (
                                       <ItemChangeForm
                                          description={item.description}
                                          place={item.place}
                                          quantity={item.quantity}
                                          light={item.light}
                                          price={item.price}
                                          heightWith={item["height-width"]}
                                          img={item.img}
                                          category={item.category}
                                          name={item.name}
                                          plantType={item["plant-type"]}
                                          numberOfOrders={item.numberOfOrders}
                                          id={item.id}
                                          roomTemperature={
                                             item["room-temperature"]
                                          }
                                          categoriesArray={categoriesArray}
                                          handleClick={updateItem}
                                          onClose={close}
                                       />
                                    )}
                                 </Popup>
                                 <button
                                    className="item-items__btn item-items__btn--delete btn btn--black"
                                    onClick={() => onRemove(item.id)}
                                 >
                                    Удалить
                                 </button>
                              </div>
                           </div>
                        </li>
                     ) : null;
                  })}
               </ul>
            </li>
         );
      });

      return <ul className="items__row">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items, categories), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="items">
         <h3>Товары</h3>
         {elements}
      </div>
   );
};

export default Items;
