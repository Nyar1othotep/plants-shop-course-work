import branch from "../../resourses/img/branch.png";

const Description = () => {
   return (
      <section
         className="section description"
         style={{
            background: `url(${branch}) right center no-repeat`,
            backgroundSize: "",
         }}
      >
         <div className="description__container _container">
            <div className="description__body">
               <div className="description__content">
                  <div className="description__heading">
                     <h2>Decorate your home with plants</h2>
                  </div>
                  <div className="description__text">
                     <p>
                        As the nights get longer, bring a sense of calm to your
                        bedroom with plants. Hanging plants, like Rapunzel the
                        golden pothos, add interest at different heights and
                        won’t mind a little shade. Susie the snake plant and
                        Pippa the peace lily have striking structure and they
                        release oxygen at night - practical and pretty.
                     </p>
                     <p>
                        Fill empty corners with a tall, thin plant like Silvy
                        the satin pothos on a mosspole or Phil the philodendron
                        scandens. Minimal floorspace, maximum impact.
                     </p>
                     <p>
                        Don’t forget your pots. Matching neutral pots will look
                        clean and elegant, while a mix of styles and patterns
                        looks eclectic and fun.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Description;
