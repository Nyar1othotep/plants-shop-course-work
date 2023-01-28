import ItemsFilter from "../itemsFilter/ItemsFilter";
import ItemsList from "../itemsList/ItemsList";
import PlantItem from "../plantItem/PlantItem";
import { useState } from "react";

const CatalogPage = () => {
   const [category, setCategory] = useState("Sansevieria");
   const [item, setItem] = useState("1");

   const onItemFilter = (value) => {
      setCategory((category) => value);
   };

   const onItem = (id) => {
      setItem((item) => id);
   };

   return (
      <div className="catalog">
         <div className="catalog__container _container">
            <div className="catalog__body">
               <ItemsFilter onItemFilter={onItemFilter} category={category} />
               <div className="catalog__row">
                  <ItemsList onItem={onItem} category={category} selectedItem={item}/>
                  <PlantItem selectedItem={item}/>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CatalogPage;
