import Stats from "components/stats/Stats";
import OrdersHistory from "components/ordersHistory/OrdersHistory";
import Categories from "components/categories/Categories";
import Items from "components/items/Items";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";
import { useState } from "react";

const AdminPanelPage = () => {
   const { isAdmin } = useAuth();
   const [reload, setReload] = useState(false);

   return isAdmin ? (
      <div className="admin-panel-page">
         <div className="admin-panel-page__container _container">
            <div className="admin-panel-page__body">
               <div className="admin-panel-page__heading">
                  <h2>Админ панель</h2>
               </div>
               <div className="admin-panel-page__row">
                  <div className="admin-panel-page__info info-admin-panel-page">
                     <Stats reload={reload} />
                     <OrdersHistory />
                  </div>
                  <Categories setReload={setReload} reload={reload} />
                  <Items reload={reload} />
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default AdminPanelPage;
