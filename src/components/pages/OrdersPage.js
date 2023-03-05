import OrderInfo from "components/order/OrderInfo";
import OrdersList from "components/ordersList/OrdersList";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const OrdersPage = () => {
   const { isAdmin } = useAuth();

   return isAdmin ? (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - заказы пользователей`}
            />
            <title>Plants shop - заказы пользователей</title>
         </Helmet>
         <div className="orders-page">
            <div className="orders-page__container _container">
               <div className="orders-page__body">
                  <ErrorBoundary>
                     <OrdersList />
                  </ErrorBoundary>
                  <ErrorBoundary>
                     <OrderInfo />
                  </ErrorBoundary>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default OrdersPage;
