import svg from "../../resourses/svg/sprites.svg";

const Reviews = () => {
   return (
      <section className="reviews">
         <div className="reviews__container _container">
            <div className="reviews__body">
               <div className="reviews__heading">
                  <h2>ОТЗЫВЫ</h2>
               </div>
               <div className="reviews__inner-container">
                  <div className="reviews__row">
                     <div className="reviews__column">
                        <div className="reviews__item item-reviews">
                           <div className="item-reviews__quotes">
                              <svg>
                                 <use href={`${svg}#quotes`}></use>
                              </svg>
                           </div>
                           <div className="item-reviews__user">
                              <div className="item-reviews__name">
                                 Надежда Ульянова
                              </div>
                              <div className="item-reviews__verification">
                                 Верифицирован
                              </div>
                           </div>
                           <div className="item-reviews__plant">
                              Алоказия 'Зебрина'
                           </div>
                           <div className="item-reviews__comment">
                              Команда Plants Shop была коммуникабельной и
                              профессиональной. Растения выглядят великолепно, и
                              персонал очень рад видеть их в офисе.
                           </div>
                        </div>
                     </div>
                     <div className="reviews__column">
                        <div className="reviews__item item-reviews">
                           <div className="item-reviews__quotes">
                              <svg>
                                 <use href={`${svg}#quotes`}></use>
                              </svg>
                           </div>
                           <div className="item-reviews__user">
                              <div className="item-reviews__name">
                                 Рита Строгова
                              </div>
                              <div className="item-reviews__verification">
                                 Верифицирован
                              </div>
                           </div>
                           <div className="item-reviews__plant">
                              Алоказия 'Зебрина'
                           </div>
                           <div className="item-reviews__comment">
                              Моя дочь была в восторге от растения, большое
                              спасибо за вашу помощь, теперь ее офис будет
                              выглядеть красиво.
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Reviews;
