import Preview from "../preview/Preview";
import Description from "../description/Description";
import Featured from "../featured/Featured";
import Reviews from "../reviews/Reviews";
import Footer from "../footer/Footer";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const MainPage = () => {
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - главная страница`}
            />
            <title>Plants shop - главная страница</title>
         </Helmet>
         <Preview />
         <Description />
         <ErrorBoundary>
            <Featured />
         </ErrorBoundary>
         <Reviews />
         <Footer />
      </>
   );
};

export default MainPage;
