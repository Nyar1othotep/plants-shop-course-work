import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { useDispatch, useSelector } from "react-redux";
import { setItemId } from "store/slices/itemSlice";

const ItemsList = () => {
   const dispatch = useDispatch();
   const { id, category } = useSelector((state) => state.item);
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

      const items = arr.map((item) => {
         return (
            <li className="items-list__column" key={item.id}>
               <div
                  className={id === item.id ? clazz + " active" : clazz}
                  onClick={() =>
                     dispatch(
                        setItemId({
                           id: item.id,
                        })
                     )
                  }
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
   }, [process, id]);

   return (
      <div className="items-list">
         <ul className="items-list__row">{elements}</ul>
      </div>
   );
};

export default ItemsList;
