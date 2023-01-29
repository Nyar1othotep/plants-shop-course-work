import MyOrdersList from "../myOrdersList/MyOrdersList";
import Logout from "components/logout/Loguot";
import { useAuth } from "hooks/useAuth.hook";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
   const { isAuth } = useAuth();

   return isAuth ? (
      <div className="profile-page">
         <div className="profile-page__container _container">
            <div className="profile-page__body">
               <Logout />
               <div className="profile-page__heading">
                  <h2>My orders</h2>
               </div>
               <MyOrdersList />
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/login" />
   );
};

export default ProfilePage;
