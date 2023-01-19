const ItemsFilter = () => {
   return (
      <div className="items-filter">
         <ul className="items-filter__list menu__list">
            <li className="items-filter__item menu__item">
               <div className="items-filter__link menu__link active">
                  SANSEVIERIA
               </div>
            </li>
            <li className="items-filter__item menu__item">
               <div className="items-filter__link menu__link">AROID</div>
            </li>
            <li className="items-filter__item menu__item">
               <div className="items-filter__link menu__link">HAWORTHIA</div>
            </li>
         </ul>
      </div>
   );
};

export default ItemsFilter;
