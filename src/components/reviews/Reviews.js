// import "./reviews.scss";
import svg from "../../resourses/svg/sprites.svg";

const Reviews = () => {
   return (
      <section className="reviews">
         <div className="reviews__container _container">
            <div className="reviews__body">
               <div className="reviews__heading">
                  <h2>Reviews</h2>
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
                                 Patrick Clarke
                              </div>
                              <div className="item-reviews__verification">
                                 Verified
                              </div>
                           </div>
                           <div className="item-reviews__plant">
                              Alocasia 'Zebrina'
                           </div>
                           <div className="item-reviews__comment">
                              The team at Plants Shop was communicative and
                              professional. The plants look great and staff are
                              really excited to have them in the office.
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
                                 Rita Strogoff
                              </div>
                              <div className="item-reviews__verification">
                                 Verified
                              </div>
                           </div>
                           <div className="item-reviews__plant">
                              Alocasia 'Zebrina'
                           </div>
                           <div className="item-reviews__comment">
                              My daughter was absolutely thrilled with the plant
                              thank you very much for your assistance her office
                              will look beautiful now.
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
