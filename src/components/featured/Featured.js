import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import setContent from "utils/setContent";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItemId, setItemCategory } from "store/slices/itemSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Featured = () => {
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const itemsCollectionRef = collection(db, "items");
   const q = query(
      itemsCollectionRef,
      orderBy("numberOfOrders", "desc"),
      limit(5)
   );

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      request(q)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      setItems((items) =>
         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
   };

   const renderItems = (arr) => {
      const items = arr.map((item) => {
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
                                 <td>{item["room-temperature"]}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                     <div className="slide-featured__btns">
                        <Link to="/catalog" className="slide-featured__link">
                           <button
                              className="slide-featured__btn plant-item__btn btn btn--border"
                              onClick={() => {
                                 dispatch(
                                    setItemId({
                                       id: item.id,
                                    })
                                 );
                                 dispatch(
                                    setItemCategory({
                                       category: item.category,
                                    })
                                 );
                              }}
                           >
                              <p>Go to catalog</p>
                              <svg>
                                 <use href={`${svg}#sharp-arrow-down`}></use>
                              </svg>
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="slide-featured__img plant-item__img">
                     <img src={item.img} alt="Alocasia 'Zebrina'" />
                  </div>
               </div>
            </SwiperSlide>
         );
      });

      return (
         <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={100}
            navigation
            loop={true}
            pagination={{ clickable: true }}
            speed={1000}
         >
            {items}
         </Swiper>
      );
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(items), items);
      // eslint-disable-next-line
   }, [process]);

   return (
      <section className="featured">
         <div className="featured__container _container">
            <div className="featured__body">
               <div className="featured__heading">
                  <h2>Featured Plants</h2>
               </div>
               <div className="featured__slider-container">{elements}</div>
            </div>
         </div>
      </section>
   );
};

export default Featured;
