const ItemsFilter = ({ onItemFilter, category }) => {
   const clazz = "items-filter__link menu__link";

   return (
      <div className="items-filter">
         <ul className="items-filter__list menu__list">
            <li className="items-filter__item menu__item">
               <div
                  className={
                     category === "Sansevieria" ? clazz + " active" : clazz
                  }
                  onClick={() => onItemFilter("Sansevieria")}
               >
                  SANSEVIERIA
               </div>
            </li>
            <li className="items-filter__item menu__item">
               <div
                  className={category === "Ivy" ? clazz + " active" : clazz}
                  onClick={() => onItemFilter("Ivy")}
               >
                  Ivy
               </div>
            </li>
            <li className="items-filter__item menu__item">
               <div
                  className={
                     category === "Zamioculcas" ? clazz + " active" : clazz
                  }
                  onClick={() => onItemFilter("Zamioculcas")}
               >
                  Zamioculcas
               </div>
            </li>
         </ul>
      </div>
   );
};

export default ItemsFilter;
