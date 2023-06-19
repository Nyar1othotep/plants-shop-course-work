import Total from "../total/Total";
import CartTable from "components/cartTable/CartTable";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";
import { store } from "store";

const CartPage = ({ handelClick }) => {
   const { isAuth } = useAuth();
   const [total, setTotal] = useState(0);

   const setTotalPrice = async (value) => {
      const totalPrice = await value;
      setTotal((total) => totalPrice);
   };

   return isAuth ? (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - корзина`}
            />
            <title>Plants shop - корзина</title>
         </Helmet>
         <div className="cart-page">
            <div className="cart-page__container _container">
               <div className="cart-page__body">
                  <div className="cart-page__heading">
                     <h2>КОРЗИНА</h2>
                  </div>
                  <div className="cart-page__row">
                     <ErrorBoundary>
                        <CartTable
                           handelClick={handelClick}
                           setTotalPrice={setTotalPrice}
                        />
                     </ErrorBoundary>
                     {total !== 0 ? (
                        <ErrorBoundary>
                           <Total total={total} />
                        </ErrorBoundary>
                     ) : null}
                  </div>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default CartPage;
