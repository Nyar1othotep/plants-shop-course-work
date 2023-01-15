import "./footer.scss";
import bg from "../../resourses/img/main-page-footer-bg.jpg";
import svg from "../../resourses/svg/sprites.svg";

const Footer = () => {
   return (
      <footer
         className="footer"
         style={{
            background: `url(${bg}) center center`,
            backgroundSize: "cover",
         }}
      >
         <div className="footer__container _container">
            <div className="footer__body">
               <div className="footer__proverb">
                  Money doesn`t grow on trees but it can plant them
               </div>
               <div className="footer__socials socials-footer">
                  <div className="socials-footer__title">Socials</div>
                  <ul className="socials-footer__row">
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer">
                           <ul className="item-socials-footer__icons-row">
                              <li className="item-socials-footer__icons-item">
                                 <svg>
                                    <use href={`${svg}#twitter`}></use>
                                 </svg>
                              </li>
                              <li className="item-socials-footer__icons-item">
                                 <svg>
                                    <use href={`${svg}#linkedin`}></use>
                                 </svg>
                              </li>
                              <li className="item-socials-footer__icons-item">
                                 <svg>
                                    <use href={`${svg}#facebook`}></use>
                                 </svg>
                              </li>
                              <li className="item-socials-footer__icons-item">
                                 <svg>
                                    <use href={`${svg}#instagram`}></use>
                                 </svg>
                              </li>
                           </ul>
                           <button className="item-socials-footer__btn btn">
                              Get your card
                           </button>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer">
                           <div className="item-socials-footer__title">
                              Careers
                           </div>
                           <ul className="item-socials-footer__row">
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    How it works
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Our mission
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Our mission
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer">
                           <div className="item-socials-footer__title">
                              FAQs
                           </div>
                           <ul className="item-socials-footer__row">
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Get the app
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Contact us
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Privacy policy
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer item-socials-footer__block-copyright">
                           <div className="item-socials-footer__title">
                              Small change. Big change.
                           </div>
                           <div className="item-socials-footer__copyright">
                              Copyright © 2022
                           </div>
                           <div className="item-socials-footer__text">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
