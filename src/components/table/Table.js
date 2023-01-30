import svg from "../../resourses/svg/sprites.svg";
import item from "../../resourses/img/item.png";

const Table = ({items}) => {
   return (
      <div className="table">
         <ul className="table__list">
            <li className="table__item item-table">
               <div className="item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-table__right">
                  <div className="item-table__name">
                     <div className="item-table__title">Alocasia 'Zebrina'</div>
                     <div className="item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-table__price">$7.39</div>
                  <div className="item-table__quantity quantity">
                     <div>
                        <svg>
                           <use href={`${svg}#minus`}></use>
                        </svg>
                        <input
                           type="number"
                           name="quantity"
                           id="quantity"
                           min={1}
                        />
                        <svg>
                           <use href={`${svg}#plus`}></use>
                        </svg>
                     </div>
                  </div>
                  <div className="item-table__total">$7.39</div>
                  <div className="item-table__remove-icon">
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </div>
               </div>
            </li>
            <li className="table__item item-table">
               <div className="item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-table__right">
                  <div className="item-table__name">
                     <div className="item-table__title">Alocasia 'Zebrina'</div>
                     <div className="item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-table__price">$7.39</div>
                  <div className="item-table__quantity quantity">
                     <div>
                        <svg>
                           <use href={`${svg}#minus`}></use>
                        </svg>
                        <input
                           type="number"
                           name="quantity"
                           id="quantity"
                           min={1}
                        />
                        <svg>
                           <use href={`${svg}#plus`}></use>
                        </svg>
                     </div>
                  </div>
                  <div className="item-table__total">$7.39</div>
                  <div className="item-table__remove-icon">
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </div>
               </div>
            </li>
            <li className="table__item item-table">
               <div className="item-table__img">
                  <img src={item} alt="Alocasia 'Zebrina'" />
               </div>
               <div className="item-table__right">
                  <div className="item-table__name">
                     <div className="item-table__title">Alocasia 'Zebrina'</div>
                     <div className="item-table__descr">
                        For our latitudes, sansevieria is a houseplant that does
                        well in our apartments and offices. The plant...
                     </div>
                  </div>
                  <div className="item-table__price">$7.39</div>
                  <div className="item-table__quantity quantity">
                     <div>
                        <svg>
                           <use href={`${svg}#minus`}></use>
                        </svg>
                        <input
                           type="number"
                           name="quantity"
                           id="quantity"
                           min={1}
                        />
                        <svg>
                           <use href={`${svg}#plus`}></use>
                        </svg>
                     </div>
                  </div>
                  <div className="item-table__total">$7.39</div>
                  <div className="item-table__remove-icon">
                     <svg>
                        <use href={`${svg}#remove`}></use>
                     </svg>
                  </div>
               </div>
            </li>
         </ul>
      </div>
   );
};

export default Table;
