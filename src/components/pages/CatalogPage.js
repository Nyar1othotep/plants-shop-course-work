import ItemsFilter from "../itemsFilter/ItemsFilter";
import ItemsList from "../itemsList/ItemsList";

const CatalogPage = () => {
   return (
      <div className="catalog__container _container">
         <div className="catalog__body">
            <ItemsFilter />
            <div className="catalog__row">
               <ItemsList />
            </div>
         </div>
      </div>
   );
};

export default CatalogPage;
