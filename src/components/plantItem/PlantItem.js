import item from "../../resourses/img/item.png";
import svg from "../../resourses/svg/sprites.svg";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const PlantItem = ({ selectedItem }) => {
   const [item, setItem] = useState([]);
   const itemsCollectionRef = collection(db, "items");
   const q = query(
      itemsCollectionRef,
      where("itemID", "==", parseInt(selectedItem))
   );

   useEffect(() => {
      const getItem = async () => {
         const data = await getDocs(q);
         setItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getItem();
      // eslint-disable-next-line
   }, [selectedItem]);

   return (
      <>
         {item.map((item) => {
            return (
               <div className="plant-item" key={item.id}>
                  <div className="plant-item__content">
                     <h3 className="plant-item__title">{item.name}</h3>
                     <div className="plant-item__info">
                        <div className="plant-item__description">
                           {item.description}
                        </div>
                        <table className="plant-item__characteristics">
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
                     <div className="plant-item__price">
                        Price: <span>${item.price}</span>
                     </div>
                     <div className="plant-item__bottom">
                        <div className="plant-item__quantity quantity">
                           <label htmlFor="quantity">Quantity:</label>
                           <div>
                              <svg>
                                 <use href={`${svg}#minus`}></use>
                              </svg>
                              <input
                                 type="number"
                                 name="quantity"
                                 id="quantity"
                                 min={1}
											max={item.quantity}
                              />
                              <svg>
                                 <use href={`${svg}#plus`}></use>
                              </svg>
                           </div>
                        </div>
                        <button className="plant-item__btn btn btn--border">
                           <p>Add to cart</p>
                           <svg>
                              <use href={`${svg}#add-to-cart`}></use>
                           </svg>
                        </button>
                     </div>
                  </div>
                  <div className="plant-item__img">
                     <img src={item.img} alt="Alocasia 'Zebrina'" />
                  </div>
               </div>
            );
         })}
      </>
   );
};

export default PlantItem;
