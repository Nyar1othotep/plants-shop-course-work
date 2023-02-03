import { useDispatch, useSelector } from "react-redux";
import { setItemCategory } from "store/slices/itemSlice";
import { useState, useEffect, useMemo, useRef } from "react";
import { useHttp } from "hooks/http.hook";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import setContent from "utils/setContent";

const ItemsFilter = () => {
   const dispatch = useDispatch();
   const [categories, setCategories] = useState([]);
   const categoriesCollectionRef = collection(db, "categories");
   const { category } = useSelector((state) => state.item);

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      request(categoriesCollectionRef)
         .then(oncategoriesLoaded)
         .then(() => setProcess("confirmed"));
   };

   const oncategoriesLoaded = (data) => {
      setCategories((categories) =>
         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
   };

   const onItem = (itemCategory, index) => {
      dispatch(
         setItemCategory({
            category: itemCategory,
         })
      );
      focusOnItem(index);
   };

   const itemRefs = useRef([]);

   const focusOnItem = (id) => {
      itemRefs.current.forEach((item) => item.classList.remove("active"));
      itemRefs.current[id].classList.add("active");
      itemRefs.current[id].focus();
   };

   const renderItems = (arr) => {
      const clazz = "items-list__item item-items-list";

      const categories = arr.map((item, i) => {
         return (
            <li className="items-filter__item menu__item" key={item.id}>
               <div
                  className={
                     category === item.category ? clazz + " active" : clazz
                  }
                  ref={(el) => (itemRefs.current[i] = el)}
                  tabIndex={0}
                  onClick={() => onItem(item.category, i)}
                  onKeyPress={(e) => {
                     if (e.key === " " || e.key === "Enter") {
                        onItem(item.category, i);
                     }
                  }}
               >
                  {item.category}
               </div>
            </li>
         );
      });

      return <>{categories}</>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(categories), categories);
      // eslint-disable-next-line
   }, [process]);

   return (
      <div className="items-filter">
         <ul className="items-filter__list menu__list">{elements}</ul>
      </div>
   );
};

export default ItemsFilter;
