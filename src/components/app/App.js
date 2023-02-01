import {
   HashRouter,
   Route,
   Routes,
   NavLink,
} from "react-router-dom";
import {
   MainPage,
   CatalogPage,
   AboutPage,
   CartPage,
   ProceedToCheckoutPage,
   LoginPage,
   RegistrationPage,
   ProfilePage,
   AdminPanelPage,
} from "../pages";
import Header from "../header/Header";

// Временное решение
const SiteMenu = () => {
   return (
      <div className="site-menu">
         <ul className="site-menu__list">
            <li className="site-menu__item">
               <NavLink to="/">MainPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/catalog">CatalogPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/about">AboutPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/cart">CartPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/cart/proceed-to-checkout">
                  ProceedToCheckoutPage
               </NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/user/login">LoginPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/user/registration">RegistrationPage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/user/profile">ProfilePage</NavLink>
            </li>
            <li className="site-menu__item">
               <NavLink to="/user/admin-panel">AdminPanelPage</NavLink>
            </li>
         </ul>
      </div>
   );
};

const App = () => {
   return (
      <HashRouter>
         <div className="app">
            <Header />
            <SiteMenu />
            <main>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                     path="/cart/proceed-to-checkout"
                     element={<ProceedToCheckoutPage />}
                  />
                  <Route path="/user/login" element={<LoginPage />} />
                  <Route
                     path="/user/registration"
                     element={<RegistrationPage />}
                  />
                  <Route path="/user/profile" element={<ProfilePage />} />
                  <Route
                     path="/user/admin-panel"
                     element={<AdminPanelPage />}
                  />
               </Routes>
            </main>
         </div>
      </HashRouter>
   );
};
export default App;
