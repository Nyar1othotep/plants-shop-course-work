import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, CatalogPage, AboutPage, CartPage, ProceedToCheckoutPage, LoginPage, RegistrationPage } from "../pages";
import Header from "../header/Header";

const App = () => {
   return (
      <Router>
         <div className="app">
            <Header />
            <main>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/cart/proceed-to-checkout" element={<ProceedToCheckoutPage />} />
                  <Route path="/user/login" element={<LoginPage />} />
                  <Route path="/user/registration" element={<RegistrationPage />} />
               </Routes>
            </main>
         </div>
      </Router>
   );
};
export default App;
