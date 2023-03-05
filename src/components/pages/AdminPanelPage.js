import Stats from "components/stats/Stats";
import OrdersHistory from "components/ordersHistory/OrdersHistory";
import Categories from "components/categories/Categories";
import Items from "components/items/Items";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const AdminPanelPage = () => {
   const { isAdmin } = useAuth();
   const [reload, setReload] = useState(false);

   return isAdmin ? (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - админ панель`}
            />
            <title>Plants shop - админ панель</title>
         </Helmet>
         <div className="admin-panel-page">
            <div className="admin-panel-page__container _container">
               <div className="admin-panel-page__body">
                  <div className="admin-panel-page__heading">
                     <h2>Админ панель</h2>
                  </div>
                  <div className="admin-panel-page__row">
                     <div className="admin-panel-page__info info-admin-panel-page">
                        <ErrorBoundary>
                           <Stats reload={reload} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                           <OrdersHistory />
                        </ErrorBoundary>
                     </div>
                     <ErrorBoundary>
                        <Categories setReload={setReload} reload={reload} />
                     </ErrorBoundary>
                     <ErrorBoundary>
                        <Items setReload={setReload} reload={reload} />
                     </ErrorBoundary>
                  </div>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default AdminPanelPage;
