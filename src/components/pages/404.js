import ErrorMessage from "../errorMessage/ErrorMessage";
import Helmet from "react-helmet";

const Page404 = () => {
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Ошибка 404`}
            />
            <title>Ошибка 404</title>
         </Helmet>
         <div className="page404">
            <ErrorMessage />
            <p>Ошибка 404 - этой страницы не существует.</p>
         </div>
      </>
   );
};

export default Page404;
