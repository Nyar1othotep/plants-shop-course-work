import AdminPanelTableList from "../adminPanelTableList/AdminPanelTableList";

const AdminPanelPage = () => {
   return (
      <div className="admin-panel-page">
         <div className="admin-panel-page__container _container">
            <div className="admin-panel-page__body">
               <div className="admin-panel-page__heading">
                  <h2>Users orders</h2>
               </div>
               <AdminPanelTableList />
            </div>
         </div>
      </div>
   );
};

export default AdminPanelPage;
