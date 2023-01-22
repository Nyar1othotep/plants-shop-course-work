import MyOrdersList from "../myOrdersList/MyOrdersList";

const ProfilePage = () => {
   return (
      <div className="profile-page">
         <div className="profile-page__container _container">
            <div className="profile-page__body">
               <div className="profile-page__heading">
                  <h2>My orders</h2>
               </div>
               <MyOrdersList />
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
