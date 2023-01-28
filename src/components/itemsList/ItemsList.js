import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemsList = ({ category, onItem, selectedItem }) => {
   const [items, setItems] = useState([]);
   const itemsCollectionRef = collection(db, "items");
   const q = query(itemsCollectionRef, where("category", "==", category));

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(q);
         setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getItems();
      // eslint-disable-next-line
   }, [category]);

   const clazz = "items-list__item item-items-list";

	console.log();

   return (
      <div className="items-list">
         <ul className="items-list__row">
            {items.map((item, i) => {
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
            })}
         </ul>
      </div>
   );
};

export default ItemsList;
