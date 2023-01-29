import Preview from "../preview/Preview";
import Description from "../description/Description";
import Featured from "../featured/Featured";
import Reviews from "../reviews/Reviews";
import Footer from "../footer/Footer";

const MainPage = () => {
   return (
      <>
         <Preview />
         <Description />
         <Featured />
         <Reviews />
         <Footer />
      </>
   );
};

export default MainPage;
