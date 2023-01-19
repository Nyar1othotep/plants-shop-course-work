import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, CatalogPage } from "../pages";
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
               </Routes>
            </main>
         </div>
      </Router>
   );
};
export default App;
