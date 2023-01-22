import item from "../../resourses/img/item.png";

const MyOrdersList = () => {
   return (
      <div className="my-orders-list-table table">
         <ul className="my-orders-list-table__list table__list">
            <li className="my-orders-list-table__item item-my-orders-list-table table__item item-table">
               <div className="item-my-orders-list-table__img item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-my-orders-list-table__right item-table__right">
                  <div className="item-my-orders-list-table__name item-table__name">
                     <div className="item-my-orders-list-table__title item-table__title">
                        Alocasia 'Zebrina'
                     </div>
                     <div className="item-my-orders-list-table__descr item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__price item-table__price">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__quantity item-table__quantity">
                     1
                  </div>
                  <div className="item-my-orders-list-table__total item-table__total">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__date-info">
                     <div className="item-my-orders-list-table__date">
                        01/01/2023
                     </div>
                     <div className="item-my-orders-list-table__time">
                        10:47
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__order-status">
                     Sent
                  </div>
               </div>
            </li>

            <li className="my-orders-list-table__item item-my-orders-list-table table__item item-table">
               <div className="item-my-orders-list-table__img item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-my-orders-list-table__right item-table__right">
                  <div className="item-my-orders-list-table__name item-table__name">
                     <div className="item-my-orders-list-table__title item-table__title">
                        Alocasia 'Zebrina'
                     </div>
                     <div className="item-my-orders-list-table__descr item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__price item-table__price">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__quantity item-table__quantity">
                     1
                  </div>
                  <div className="item-my-orders-list-table__total item-table__total">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__date-info">
                     <div className="item-my-orders-list-table__date">
                        01/01/2023
                     </div>
                     <div className="item-my-orders-list-table__time">
                        10:47
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__order-status">
                     Completed
                  </div>
               </div>
            </li>

            <li className="my-orders-list-table__item item-my-orders-list-table table__item item-table">
               <div className="item-my-orders-list-table__img item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-my-orders-list-table__right item-table__right">
                  <div className="item-my-orders-list-table__name item-table__name">
                     <div className="item-my-orders-list-table__title item-table__title">
                        Alocasia 'Zebrina'
                     </div>
                     <div className="item-my-orders-list-table__descr item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__price item-table__price">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__quantity item-table__quantity">
                     1
                  </div>
                  <div className="item-my-orders-list-table__total item-table__total">
                     $7.39
                  </div>
                  <div className="item-my-orders-list-table__date-info">
                     <div className="item-my-orders-list-table__date">
                        01/01/2023
                     </div>
                     <div className="item-my-orders-list-table__time">
                        10:47
                     </div>
                  </div>
                  <div className="item-my-orders-list-table__order-status">
                     Completed
                  </div>
               </div>
            </li>
         </ul>
      </div>
   );
};

export default MyOrdersList;
