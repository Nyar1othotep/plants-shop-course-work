import Total from "../total/Total";
import CartTable from "components/cartTable/CartTable";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const CartPage = ({ handelClick }) => {
   const { isAuth } = useAuth();
   const [total, setTotal] = useState(0);

   const setTotalPrice = async (value) => {
      const totalPrice = await value;
      setTotal((total) => totalPrice);
   };

   return isAuth ? (
      <div className="cart-page">
         <div className="cart-page__container _container">
            <div className="cart-page__body">
               <div className="cart-page__heading">
                  <h2>Cart</h2>
               </div>
               <div className="cart-page__row">
                  <CartTable
                     handelClick={handelClick}
                     setTotalPrice={setTotalPrice}
                  />
                  {total !== 0 ? <Total total={total} /> : null}
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default CartPage;
