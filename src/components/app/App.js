import { HashRouter, Route, Routes, NavLink } from "react-router-dom";
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
   OrdersPage,
} from "../pages";
import { db } from "../../firebase";
import Header from "../header/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "store/slices/userSlice";
import {
   collection,
   query,
   where,
   getCountFromServer,
} from "firebase/firestore";

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
   const dispatch = useDispatch();
   const auth = getAuth();
   const [countCart, setCountCart] = useState(0);
   const [isReAuth, setIsReAuth] = useState("");
   const usersCartCollectionRef = collection(db, "usersCart");

   useEffect(() => {
      onAuthStateChanged(auth, (data) => {
         if (data !== null) {
            dispatch(
               setUser({
                  email: data.email,
                  userUID: data.uid,
                  token: data.accessToken,
               })
            );
         }
         getCountOfItemsFromCart(data.uid);
         setIsReAuth((isReAuth) => data.uid);
      });
      // eslint-disable-next-line
   }, []);

   const getCountOfItemsFromCart = async (userUID, logout = false) => {
      const query_ = query(
         usersCartCollectionRef,
         where("userID", "==", userUID)
      );
      const snapshot = await getCountFromServer(query_);
      setCountCart((countCart) => (!logout ? snapshot.data().count : 0));
   };

   return (
      <HashRouter>
         <div className="app">
            <Header countCart={countCart} />
            <SiteMenu />
            <main>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route
                     path="/catalog"
                     element={
                        <CatalogPage
                           handelClick={getCountOfItemsFromCart}
                           isReAuth={isReAuth}
                        />
                     }
                  />
                  <Route path="/about" element={<AboutPage />} />
                  <Route
                     path="/cart"
                     element={
                        <CartPage handelClick={getCountOfItemsFromCart} />
                     }
                  />
                  <Route
                     path="/cart/proceed-to-checkout"
                     element={
                        <ProceedToCheckoutPage
                           handelClick={getCountOfItemsFromCart}
                        />
                     }
                  />
                  <Route path="/user/login" element={<LoginPage />} />
                  <Route
                     path="/user/registration"
                     element={<RegistrationPage />}
                  />
                  <Route
                     path="/user/profile"
                     element={
                        <ProfilePage handelClick={getCountOfItemsFromCart} />
                     }
                  />
                  <Route
                     path="/user/admin-panel"
                     element={<AdminPanelPage />}
                  />
                  <Route path="/orders" element={<OrdersPage />} />
               </Routes>
            </main>
         </div>
      </HashRouter>
   );
};
export default App;
