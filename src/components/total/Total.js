const Total = () => {
   return (
      <div className="total">
         <ul className="total__row">
            <li className="total__column">
               <div className="total__item item-total">
                  <div className="item-total__title">Subtotal:</div>
                  <div className="item-total__money">$334.32</div>
               </div>
            </li>
            <li className="total__column">
               <div className="total__item item-total">
                  <div className="item-total__title">Grand total:</div>
                  <div className="item-total__money item-total__money--grand">$334.32</div>
               </div>
            </li>
         </ul>
         <button className="total__btn btn btn--black">
            Proceed to checkout
         </button>
      </div>
   );
};

export default Total;
