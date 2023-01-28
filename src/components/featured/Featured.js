import { Lazy, Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Featured = () => {
   const [items, setItems] = useState([]);
   const itemsCollectionRef = collection(db, "items");
   const q = query(
      itemsCollectionRef,
      orderBy("numberOfOrders", "desc"),
      limit(5)
   );

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(q);
         setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getItems();
      // eslint-disable-next-line
   }, []);

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
                     {items.map((item) => {
                        return (
                           <SwiperSlide key={item.id}>
                              <div className="featured__slide slide-featured plant-item">
                                 <div className="slide-featured__content plant-item__content">
                                    <h3 className="slide-featured__title plant-item__title">
                                       {item.name}
                                    </h3>
                                    <div className="slide-featured__info plant-item__info">
                                       <div className="slide-featured__description plant-item__description">
                                          {item.description}
                                       </div>
                                       <table className="slide-featured__characteristics plant-item__characteristics">
                                          <tbody>
                                             <tr>
                                                <td>Name:</td>
                                                <td>{item.category}</td>
                                             </tr>
                                             <tr>
                                                <td>Plant type:</td>
                                                <td>{item["plant-type"]}</td>
                                             </tr>
                                             <tr>
                                                <td>Place:</td>
                                                <td>{item.place}</td>
                                             </tr>
                                             <tr>
                                                <td>Height:</td>
                                                <td>{item["height-width"]}</td>
                                             </tr>
                                             <tr>
                                                <td>Light:</td>
                                                <td>{item.light}</td>
                                             </tr>
                                             <tr>
                                                <td>Room temperature:</td>
                                                <td>
                                                   {item["room-temperature"]}
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                    <button className="slide-featured__btn plant-item__btn btn btn--border">
                                       <p>Go to catalog</p>
                                       <svg>
                                          <use
                                             href={`${svg}#sharp-arrow-down`}
                                          ></use>
                                       </svg>
                                    </button>
                                 </div>
                                 <div className="slide-featured__img plant-item__img">
                                    <img
                                       className="swiper-lazy"
                                       data-src={item.img}
                                       alt="Alocasia 'Zebrina'"
                                    />
                                    <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        );
                     })}
                  </Swiper>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Featured;
