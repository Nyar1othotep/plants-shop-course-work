import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, addDoc } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import svg from "../../resourses/svg/sprites.svg";
import Popup from "reactjs-popup";
import AddNewCategory from "components/addNewCategory/AddNewCategory";

const Categories = ({ setReload, reload }) => {
   const [categories, setCategories] = useState([]);
   const categoriesCollectionRef = collection(db, "categories");

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      request(categoriesCollectionRef)
         .then(onCategoriesLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onCategoriesLoaded = (data) => {
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategories((categories) => gotData);
   };

   const deleteCategory = async (id) => {
      try {
         const itemDoc = doc(db, "categories", id);
         await deleteDoc(itemDoc);
         onRequest();
         setReload((reload) => !reload);
         alert("Категория удалена");
      } catch (error) {
         console.error(error.message);
      }
   };

   const onRemove = (itemID) => {
      if (window.confirm("Вы уверены, что хотите удалить категорию?"))
         deleteCategory(itemID);
   };

   const addNewDoc = async (title) => {
      await addDoc(collection(db, "categories"), {
         category: title,
      });
      onRequest();
      setReload((reload) => !reload);
      alert("Категория добавлена!");
   };

   const renderItems = (arr) => {
      const items = arr.map((item) => {
         return (
            <li className="categories__item" key={item.id}>
               {item.category}
               <div
                  className="categories__remove-icon"
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
            </li>
         );
      });

      return (
         <ul className="categories__row">
            {arr.length !== 0 ? (
               items
            ) : (
               <p>Категорий еще нет, но вы можете их добавить</p>
            )}
            <Popup
               trigger={
                  <button className="categories__item categories__add-icon">
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
                  <AddNewCategory handleClick={addNewDoc} onClose={close} />
               )}
            </Popup>
         </ul>
      );
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(categories), categories);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="categories">
         <h3>Категории</h3>
         {elements}
      </div>
   );
};

export default Categories;
