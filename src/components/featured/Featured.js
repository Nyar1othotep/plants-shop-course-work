import item from "../../resourses/img/item.png";
import { Lazy, Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import svg from "../../resourses/svg/sprites.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Featured = () => {
   return (
      <section className="featured">
         <div className="featured__container _container">
            <div className="featured__body">
               <div className="featured__heading">
                  <h2>Featured Plants</h2>
               </div>
               <div className="featured__slider-container">
                  <Swiper
                     modules={[Lazy, Navigation, Pagination, A11y]}
                     lazy={true}
                     slidesPerView={1}
                     spaceBetween={100}
                     navigation
                     loop={true}
                     pagination={{ clickable: true }}
                     speed={1000}
                  >
                     <SwiperSlide>
                        <div className="featured__slide slide-featured plant-item">
                           <div className="slide-featured__content plant-item__content">
                              <h3 className="slide-featured__title plant-item__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info plant-item__info">
                                 <div className="slide-featured__description plant-item__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics plant-item__characteristics">
                                    <tbody>
                                       <tr>
                                          <td>Name:</td>
                                          <td>Alocasia</td>
                                       </tr>
                                       <tr>
                                          <td>Plant type:</td>
                                          <td>Decorative leafy Indoor</td>
                                       </tr>
                                       <tr>
                                          <td>Place:</td>
                                          <td>Floor Standing</td>
                                       </tr>
                                       <tr>
                                          <td>Height:</td>
                                          <td>65/90 cm</td>
                                       </tr>
                                       <tr>
                                          <td>Light:</td>
                                          <td>Unpretentious</td>
                                       </tr>
                                       <tr>
                                          <td>Room temperature:</td>
                                          <td>Moderate (21°C - 23°C)</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                              <button className="slide-featured__btn plant-item__btn btn">
                                 <p>Go to catalog</p>
                                 <svg>
                                    <use href={`${svg}#sharp-arrow-down`}></use>
                                 </svg>
                              </button>
                           </div>
                           <div className="slide-featured__img plant-item__img">
                              <img
                                 className="swiper-lazy"
                                 data-src={item}
                                 alt="Alocasia 'Zebrina'"
                              />
                              <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="featured__slide slide-featured plant-item">
                           <div className="slide-featured__content plant-item__content">
                              <h3 className="slide-featured__title plant-item__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info plant-item__info">
                                 <div className="slide-featured__description plant-item__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics plant-item__characteristics">
                                    <tbody>
                                       <tr>
                                          <td>Name:</td>
                                          <td>Alocasia</td>
                                       </tr>
                                       <tr>
                                          <td>Plant type:</td>
                                          <td>Decorative leafy Indoor</td>
                                       </tr>
                                       <tr>
                                          <td>Place:</td>
                                          <td>Floor Standing</td>
                                       </tr>
                                       <tr>
                                          <td>Height:</td>
                                          <td>65/90 cm</td>
                                       </tr>
                                       <tr>
                                          <td>Light:</td>
                                          <td>Unpretentious</td>
                                       </tr>
                                       <tr>
                                          <td>Room temperature:</td>
                                          <td>Moderate (21°C - 23°C)</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                              <button className="slide-featured__btn plant-item__btn btn">
                                 <p>Go to catalog</p>
                                 <svg>
                                    <use href={`${svg}#sharp-arrow-down`}></use>
                                 </svg>
                              </button>
                           </div>
                           <div className="slide-featured__img plant-item__img">
                              <img
                                 className="swiper-lazy"
                                 data-src={item}
                                 alt="Alocasia 'Zebrina'"
                              />
                              <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="featured__slide slide-featured plant-item">
                           <div className="slide-featured__content plant-item__content">
                              <h3 className="slide-featured__title plant-item__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info plant-item__info">
                                 <div className="slide-featured__description plant-item__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics plant-item__characteristics">
                                    <tbody>
                                       <tr>
                                          <td>Name:</td>
                                          <td>Alocasia</td>
                                       </tr>
                                       <tr>
                                          <td>Plant type:</td>
                                          <td>Decorative leafy Indoor</td>
                                       </tr>
                                       <tr>
                                          <td>Place:</td>
                                          <td>Floor Standing</td>
                                       </tr>
                                       <tr>
                                          <td>Height:</td>
                                          <td>65/90 cm</td>
                                       </tr>
                                       <tr>
                                          <td>Light:</td>
                                          <td>Unpretentious</td>
                                       </tr>
                                       <tr>
                                          <td>Room temperature:</td>
                                          <td>Moderate (21°C - 23°C)</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                              <button className="slide-featured__btn plant-item__btn btn">
                                 <p>Go to catalog</p>
                                 <svg>
                                    <use href={`${svg}#sharp-arrow-down`}></use>
                                 </svg>
                              </button>
                           </div>
                           <div className="slide-featured__img plant-item__img">
                              <img
                                 className="swiper-lazy"
                                 data-src={item}
                                 alt="Alocasia 'Zebrina'"
                              />
                              <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                           </div>
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Featured;
