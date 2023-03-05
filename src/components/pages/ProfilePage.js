import MyOrdersList from "../myOrdersList/MyOrdersList";
import Logout from "components/logout/Loguot";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Helmet from "react-helmet";

const ProfilePage = ({ handelClick }) => {
   const { isAuth } = useAuth();

   return isAuth ? (
      <>
         <Helmet>
            <meta
               name="description"
               content={`Plants shop - профиль пользователя`}
            />
            <title>Plants shop - профиль пользователя</title>
         </Helmet>
         <div className="profile-page">
            <div className="profile-page__container _container">
               <div className="profile-page__body">
                  <Logout handelClick={handelClick} />
                  <div className="profile-page__heading">
                     <h2>Мои заказы</h2>
                  </div>
                  <ErrorBoundary>
                     <MyOrdersList />
                  </ErrorBoundary>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default ProfilePage;
