import item from "../../resourses/img/item.png";
import svg from "../../resourses/svg/sprites.svg";

const PlantItem = () => {
   return (
      <div className="plant-item">
         <div className="plant-item__content">
            <h3 className="plant-item__title">Alocasia 'Zebrina'</h3>
            <div className="plant-item__info">
               <div className="plant-item__description">
                  For our latitudes, sansevieria is a houseplant that does well
                  in our apartments and offices. The plant tolerates a drop in
                  temperature to degrees Celsius, but does not feel comfortable.
                  The optimum temperature regim.
               </div>
               <table className="plant-item__characteristics">
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
            <div className="plant-item__price">
               Price: <span>$7.39</span>
            </div>
            <div className="plant-item__bottom">
               <div className="plant-item__quantity">
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
                     />
                     <svg>
                        <use href={`${svg}#plus`}></use>
                     </svg>
                  </div>
               </div>
               <button className="plant-item__btn btn">
                  <p>Add to cart</p>
                  <svg>
                     <use href={`${svg}#add-to-cart`}></use>
                  </svg>
               </button>
            </div>
         </div>
         <div className="plant-item__img">
            <img src={item} alt="Alocasia 'Zebrina'" />
         </div>
      </div>
   );
};

export default PlantItem;
