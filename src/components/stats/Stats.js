import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { useHttp } from "hooks/http.hook";
import Spinner from "components/spinner/Spinner";

const Stats = () => {
   const [totalIncome, setTotalIncome] = useState(0);
   const [countItems, setCountItems] = useState(0);
   const [countItemsSold, setCountItemsSold] = useState(0);
   const [countCategory, setCountCategory] = useState(0);
   const itemsCollectionRef = collection(db, "items");
   const usersOrderCollectionRef = collection(db, "usersOrder");
   const categoriesCollectionRef = collection(db, "categories");

   const { request, process, setProcess } = useHttp();

   useEffect(() => {
      onRequest();
      getCount(itemsCollectionRef, setCountItems, countItems);
      getCount(usersOrderCollectionRef, setCountItemsSold, countItemsSold);
      getCount(categoriesCollectionRef, setCountCategory, countCategory);
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      request(usersOrderCollectionRef)
         .then(onItemsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onItemsLoaded = (data) => {
      let total = 0;
      const gotData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      gotData.map((item) => {
         return item.orderArray.map((item) => {
            return (total += parseFloat(item.itemTotal));
         });
      });
      setTotalIncome((totalIncome) => total);
   };

   const getCount = async (ref, setState, state) => {
      const snapshot = await getCountFromServer(ref);
      setState((state) => snapshot.data().count);
   };

   return (
      <div className="stats">
         <h3>Статистика</h3>
         <ul className="stats__grid">
            <li className="stats__item item-stats">
               <div className="item-stats__icon">
                  <svg>
                     <use href={`${svg}#rocket`}></use>
                  </svg>
               </div>
               <div className="item-stats__inner">
                  <div className="item-stats__value">
                     {countItems === 0 ? <Spinner /> : countItems}
                  </div>
                  <div className="item-stats__label">Всего товаров</div>
               </div>
            </li>

            <li className="stats__item item-stats">
               <div className="item-stats__icon">
                  <svg>
                     <use href={`${svg}#cart`}></use>
                  </svg>
               </div>
               <div className="item-stats__inner">
                  <div className="item-stats__value">
                     {countItemsSold === 0 ? <Spinner /> : countItemsSold}
                  </div>
                  <div className="item-stats__label">Всего заказов</div>
               </div>
            </li>

            <li className="stats__item item-stats">
               <div className="item-stats__icon">
                  <svg>
                     <use href={`${svg}#category`}></use>
                  </svg>
               </div>
               <div className="item-stats__inner">
                  <div className="item-stats__value">
                     {countCategory === 0 ? <Spinner /> : countCategory}
                  </div>
                  <div className="item-stats__label">Всего категорий</div>
               </div>
            </li>

            <li className="stats__item item-stats">
               <div className="item-stats__icon">
                  <svg>
                     <use href={`${svg}#dollar`}></use>
                  </svg>
               </div>
               <div className="item-stats__inner">
                  <div className="item-stats__value">
                     {process === "loading" ? (
                        <Spinner />
                     ) : (
                        `${totalIncome.toFixed(2)}₽`
                     )}
                  </div>
                  <div className="item-stats__label">Общая прибыль</div>
               </div>
            </li>
         </ul>
      </div>
   );
};

export default Stats;
