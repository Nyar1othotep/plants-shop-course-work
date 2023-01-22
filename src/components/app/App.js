import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, CatalogPage, AboutPage, CartPage } from "../pages";
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
               </Routes>
            </main>
         </div>
      </Router>
   );
};
export default App;
