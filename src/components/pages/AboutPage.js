import AboutAccordion from "../aboutAccordion/AboutAccordion";
import Helmet from "react-helmet";

const AboutPage = () => {
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - о нас`}
            />
            <title>Plants shop - о нас</title>
         </Helmet>
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
      </>
   );
};

export default AboutPage;
