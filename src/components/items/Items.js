import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, addDoc } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import svg from "../../resourses/svg/sprites.svg";
import Popup from "reactjs-popup";
import ItemChangeForm from "components/itemChangeForm/ItemChangeForm";

const Items = ({ reload }) => {
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

   // const deleteCategory = async (id) => {
   //    try {
   //       const itemDoc = doc(db, "categories", id);
   //       await deleteDoc(itemDoc);
   //       onRequest();
   //       alert("Категория удалена");
   //    } catch (error) {
   //       console.error(error.message);
   //    }
   // };

   // const onRemove = (itemID) => {
   //    if (window.confirm("Вы уверены, что хотите удалить категорию?"))
   //       deleteCategory(itemID);
   // };

   // const addNewDoc = async (title) => {
   //    await addDoc(collection(db, "categories"), {
   //       category: title,
   //    });
   //    onRequest();
   //    alert("Категория добавлена!");
   // };

   const updateItem = (
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
      console.log(
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
      );
   };

   const renderItems = (arr, categoriesArray) => {
      const items = categoriesArray.map((category) => {
         return (
            <li className="items__column" key={category.id}>
               <h4>{category.category}</h4>
               <ul className="items__list">
                  <li className="items__item item-items add">
                     <div className="item-items__content">
                        <svg>
                           <use href={`${svg}#plus`}></use>
                        </svg>
                     </div>
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
