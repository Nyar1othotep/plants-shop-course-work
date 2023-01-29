import { useDispatch, useSelector } from "react-redux";
import { setItemCategory } from "store/slices/itemSlice";

const ItemsFilter = () => {
   const dispatch = useDispatch();
   const { category } = useSelector((state) => state.item);
   const clazz = "items-filter__link menu__link";

   return (
      <div className="items-filter">
         <ul className="items-filter__list menu__list">
            <li className="items-filter__item menu__item">
               <div
                  className={
                     category === "Sansevieria" ? clazz + " active" : clazz
                  }
                  onClick={() =>
                     dispatch(
                        setItemCategory({
                           category: "Sansevieria",
                        })
                     )
                  }
               >
                  SANSEVIERIA
               </div>
            </li>
            <li className="items-filter__item menu__item">
               <div
                  className={category === "Ivy" ? clazz + " active" : clazz}
                  onClick={() =>
                     dispatch(
                        setItemCategory({
                           category: "Ivy",
                        })
                     )
                  }
               >
                  Ivy
               </div>
            </li>
            <li className="items-filter__item menu__item">
               <div
                  className={
                     category === "Zamioculcas" ? clazz + " active" : clazz
                  }
                  onClick={() =>
                     dispatch(
                        setItemCategory({
                           category: "Zamioculcas",
                        })
                     )
                  }
               >
                  Zamioculcas
               </div>
            </li>
         </ul>
      </div>
   );
};

export default ItemsFilter;
