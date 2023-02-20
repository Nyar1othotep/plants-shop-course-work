import AboutAccordion from "../aboutAccordion/AboutAccordion";

const AboutPage = () => {
   return (
      <div className="about">
         <div className="about__container _container">
            <div className="about__body">
               <div className="about__heading">
                  <h2>О КОМПАНИИ</h2>
               </div>
               <AboutAccordion />
            </div>
         </div>
      </div>
   );
};

export default AboutPage;
