import ItemsFilter from "../itemsFilter/ItemsFilter";
import ItemsList from "../itemsList/ItemsList";
import PlantItem from "../plantItem/PlantItem";

const CatalogPage = () => {
   return (
      <div className="catalog">
      	<div className="catalog__container _container">
	         <div className="catalog__body">
	            <ItemsFilter />
	            <div className="catalog__row">
	               <ItemsList />
	               <PlantItem />
	            </div>
	         </div>
	      </div>
      </div>
   );
};

export default CatalogPage;
