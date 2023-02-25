import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { useDispatch, useSelector } from "react-redux";
import { setItemId } from "store/slices/itemSlice";

const ItemsList = () => {
   const dispatch = useDispatch();
   const { id, category } = useSelector((state) => state.item);
   const [items, setItems] = useState([]);
   const [isEmptyCategory, setIsEmptyCategory] = useState(true);
   const [isEmptyData, setIsEmptyData] = useState(true);
   const itemsCollectionRef = collection(db, "items");
   const categoriesCollectionRef = collection(db, "categories");
   const _query = query(
      categoriesCollectionRef,
      where("category", "==", category)
   );
   const q = query(itemsCollectionRef, where("category", "==", category));
   const { request, process, setProcess } = useHttp();
   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [category]);

   const isCategory = async () => {
      const data = await getDocs(_query);
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (gotData.length !== 0) {
         setIsEmptyCategory((isEmptyCategory) => false);
      } else {
         setIsEmptyCategory((isEmptyCategory) => true);
      }
   };

   isCategory();

   const onRequest = () => {
      request(q)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (gotData.length !== 0) {
         setItems((items) => gotData);
         setIsEmptyData((isEmptyData) => false);
      } else {
         setIsEmptyData((isEmptyData) => true);
      }
   };

   const onItem = (itemID, index) => {
      dispatch(
         setItemId({
            id: itemID,
         })
      );
      focusOnItem(index);
   };

   const itemRefs = useRef([]);

   const focusOnItem = (id) => {
      itemRefs.current.forEach((item) =>
         item !== null ? item.classList.remove("active") : null
      );
      itemRefs.current[id].classList.add("active");
      itemRefs.current[id].focus();
   };

   const renderItems = (arr) => {
      const clazz = "items-list__item item-items-list";

      const items = arr.map((item, i) => {
         return (
            <li className="items-list__column" key={item.id}>
               <div
                  className={id === item.id ? clazz + " active" : clazz}
                  tabIndex={0}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => onItem(item.id, i)}
                  onKeyPress={(e) => {
                     if (e.key === " " || e.key === "Enter") {
                        onItem(item.id, i);
                     }
                  }}
               >
                  <div className="item-items-list__img">
                     <img src={item.img} alt={item.name} />
                  </div>
                  <div className="item-items-list__name">
                     <p>{item.name}</p>
                  </div>
               </div>
            </li>
         );
      });

      return <>{items}</>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="items-list">
         <ul className="items-list__row">
            {isEmptyData || isEmptyCategory ? (
               <div>
                  Выберите другую категорию, т.к. в этой категории еще нет товаров
                  или она больше не существует.
               </div>
            ) : (
               elements
            )}
         </ul>
      </div>
   );
};

export default ItemsList;
