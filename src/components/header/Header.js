import svg from "../../resourses/svg/sprites.svg";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAuth } from "hooks/useAuth.hook";

const Header = ({ countCart }) => {
   const [isOpenBurger, setIsOpenBurger] = useState(false);
   const { isAuth } = useAuth();

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      const showAnim = gsap
         .from(".header", {
            yPercent: -100,
            paused: true,
            duration: 0.2,
         })
         .progress(1);

      ScrollTrigger.create({
         start: "top top",
         end: 99999,
         onUpdate: (self) => {
            self.direction === -1 ? showAnim.play() : showAnim.reverse();
         },
      });
      // eslint-disable-next-line
   }, []);

   const onBurger = () => {
      setIsOpenBurger((isOpenBurger) => !isOpenBurger);
   };

   return (
      <header className={`header ${isOpenBurger ? "active" : ""}`}>
         <div className="header__container _container">
            <div className="header__body">
               <Link to="/" className="header__logo logo">
                  <svg>
                     <use href={`${svg}#logo`}></use>
                  </svg>
                  <span>Растения</span>
               </Link>
               <nav
                  className={`header__menu menu-header menu ${
                     isOpenBurger ? "active" : ""
                  }`}
               >
                  <ul className="menu-header__list menu__list">
                     <li className="menu-header__item menu__item">
                        <NavLink
                           to="/"
                           className="menu-header__link menu__link"
                        >
                           Главная
                        </NavLink>
                     </li>
                     <li className="menu-header__item menu__item">
                        <NavLink
                           to="/catalog"
                           className="menu-header__link menu__link"
                        >
                           Каталог
                        </NavLink>
                     </li>
                     <li className="menu-header__item menu__item">
                        <NavLink
                           to="/about"
                           className="menu-header__link menu__link"
                        >
                           О нас
                        </NavLink>
                     </li>
                  </ul>
               </nav>
               <div className="header__right">
                  <nav className="header__account-menu account-menu-header">
                     <ul className="account-menu-header__list">
                        <li className="account-menu-header__item basket">
                           <NavLink
                              to="/cart"
                              className="account-menu-header__link"
                           >
                              <svg>
                                 <use href={`${svg}#basket`}></use>
                              </svg>
                           </NavLink>
                           {countCart !== 0 ? (
                              <div className="account-menu-header__basket-count">
                                 {countCart}
                              </div>
                           ) : null}
                        </li>
                        <li className="account-menu-header__item">
                           <NavLink
                              to={isAuth ? "/user/profile" : "/user/login"}
                              className="account-menu-header__link"
                           >
                              <svg>
                                 <use href={`${svg}#account`}></use>
                              </svg>
                           </NavLink>
                        </li>
                     </ul>
                  </nav>
                  <div
                     className={`header__burger ${
                        isOpenBurger ? "active" : ""
                     }`}
                     onClick={onBurger}
                  >
                     <span></span>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
