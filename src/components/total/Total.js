import { memo } from "react";
import { Link } from "react-router-dom";

const Total = memo(({ total }) => {
   return (
      <div className="total">
         <ul className="total__row">
            <li className="total__column">
               <div className="total__item item-total">
                  <div className="item-total__title">Пром. итог:</div>
                  <div className="item-total__money">${total.toFixed(2)}</div>
               </div>
            </li>
            <li className="total__column">
               <div className="total__item item-total">
                  <div className="item-total__title">Итого:</div>
                  <div className="item-total__money item-total__money--grand">
                     ${total.toFixed(2)}
                  </div>
               </div>
            </li>
         </ul>
         <Link to="/cart/proceed-to-checkout">
            <button className="total__btn btn btn--black">
               Оформлению заказа
            </button>
         </Link>
      </div>
   );
});

export default Total;
