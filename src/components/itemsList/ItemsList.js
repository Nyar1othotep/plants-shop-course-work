import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";

const ItemsList = ({ category, onItem, selectedItem }) => {
   const [items, setItems] = useState([]);
   const itemsCollectionRef = collection(db, "items");
   const q = query(itemsCollectionRef, where("category", "==", category));

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, [category]);

   const onRequest = () => {
      request(q)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      setItems((items) =>
         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
   };

   const renderItems = (arr) => {
      const clazz = "items-list__item item-items-list";

      const items = arr.map((item, i) => {
         return (
            <li className="items-list__column" key={item.id}>
               <div
                  className={
                     selectedItem === item.id ? clazz + " active" : clazz
                  }
                  onClick={() => onItem(item.id)}
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

      return <ul className="items-list__row">{items}</ul>;
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process, selectedItem]);

   return <div className="items-list">{elements}</div>;
};

export default ItemsList;
