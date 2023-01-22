import Table from "../table/Table";
import Total from "../total/Total";

const CartPage = () => {
   return (
      <div className="cart-page">
         <div className="cart-page__container _container">
            <div className="cart-page__body">
               <div className="cart-page__heading">
                  <h2>Cart</h2>
               </div>
               <div className="cart-page__row">
                  <Table />
						<Total />
               </div>
            </div>
         </div>
      </div>
   );
};

export default CartPage;
