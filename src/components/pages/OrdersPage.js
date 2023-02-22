import OrderInfo from "components/order/OrderInfo";
import OrdersList from "components/ordersList/OrdersList";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";

const OrdersPage = () => {
   const { isAdmin } = useAuth();

   return isAdmin ? (
      <div className="orders-page">
         <div className="orders-page__container _container">
            <div className="orders-page__body">
               <OrdersList />
               <OrderInfo />
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default OrdersPage;
