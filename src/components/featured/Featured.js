import "./featured.scss";
import item from "../../resourses/img/item.png";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
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
                     modules={[Navigation, Pagination, A11y]}
                     slidesPerView={1}
							spaceBetween={100}
                     navigation
                     pagination={{ clickable: true }}
                     speed={1000}
                  >
                     <SwiperSlide>
                        <div className="featured__slide slide-featured">
                           <div className="slide-featured__content">
                              <h3 className="slide-featured__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info">
                                 <div className="slide-featured__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics">
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
                                 </table>
                              </div>
                              <button className="slide-featured__btn btn">
                                 Go to catalog
                              </button>
                           </div>
                           <div className="slide-featured__img">
                              <img src={item} alt="Alocasia 'Zebrina'" />
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="featured__slide slide-featured">
                           <div className="slide-featured__content">
                              <h3 className="slide-featured__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info">
                                 <div className="slide-featured__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics">
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
                                 </table>
                              </div>
                              <button className="slide-featured__btn btn">
                                 Go to catalog
                              </button>
                           </div>
                           <div className="slide-featured__img">
                              <img src={item} alt="Alocasia 'Zebrina'" />
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="featured__slide slide-featured">
                           <div className="slide-featured__content">
                              <h3 className="slide-featured__title">
                                 Alocasia 'Zebrina'
                              </h3>
                              <div className="slide-featured__info">
                                 <div className="slide-featured__description">
                                    For our latitudes, sansevieria is a
                                    houseplant that does well in our apartments
                                    and offices. The plant tolerates a drop in
                                    temperature to degrees Celsius, but does not
                                    feel comfortable. The optimum temperature
                                    regim.
                                 </div>
                                 <table className="slide-featured__characteristics">
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
                                 </table>
                              </div>
                              <button className="slide-featured__btn btn">
                                 Go to catalog
                              </button>
                           </div>
                           <div className="slide-featured__img">
                              <img src={item} alt="Alocasia 'Zebrina'" />
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
