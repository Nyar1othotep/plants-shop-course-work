import ItemsFilter from "../itemsFilter/ItemsFilter";
import ItemsList from "../itemsList/ItemsList";
import PlantItem from "../plantItem/PlantItem";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const CatalogPage = ({ handelClick, isReAuth }) => {
   return (
      <>
         <Helmet>
            <meta name="description" content={`Plants shop - каталог`} />
            <title>Plants shop - каталог</title>
         </Helmet>
         <div className="catalog">
            <div className="catalog__container _container">
               <div className="catalog__body">
                  <ErrorBoundary>
                     <ItemsFilter />
                  </ErrorBoundary>
                  <div className="catalog__row">
                     <ErrorBoundary>
                        <ItemsList />
                     </ErrorBoundary>
                     <ErrorBoundary>
                        <PlantItem
                           handelClick={handelClick}
                           isReAuth={isReAuth}
                        />
                     </ErrorBoundary>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CatalogPage;
