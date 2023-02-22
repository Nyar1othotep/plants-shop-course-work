import Stats from "components/stats/Stats";
import OrdersHistory from "components/ordersHistory/OrdersHistory";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";

const AdminPanelPage = () => {
   const { isAdmin } = useAuth();

   return isAdmin ? (
      <div className="admin-panel-page">
         <div className="admin-panel-page__container _container">
            <div className="admin-panel-page__body">
               <div className="admin-panel-page__heading">
                  <h2>Админ панель</h2>
                  <div className="admin-panel-page__info info-admin-panel-page">
                     <Stats />
                     <OrdersHistory />
                  </div>
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default AdminPanelPage;
