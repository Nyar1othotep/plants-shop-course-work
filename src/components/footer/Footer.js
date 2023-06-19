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
                  ДЕНЬГИ НЕ РАСТУТ НА ДЕРЕВЬЯХ, НО МЫ МОЖЕМ ЗА НИХ ЧТО-ТО ПРИОБРЕСТИ
               </div>
               <div className="footer__socials socials-footer">
                  <div className="socials-footer__title">СОЦИАЛЬНЫЕ СЕТИ</div>
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
                              Купон
                           </button>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer">
                           <div className="item-socials-footer__title">
                              Карьера
                           </div>
                           <ul className="item-socials-footer__row">
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Как это работает
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Наша цель
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Наша миссия
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer">
                           <div className="item-socials-footer__title">
                              Часто задаваемые вопросы
                           </div>
                           <ul className="item-socials-footer__row">
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Приложение
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Связаться с нами
                                 </span>
                              </li>
                              <li className="item-socials-footer__item">
                                 {/* Заглушка, потом надо сделать ссылку через реакт роутер */}
                                 <span className="item-socials-footer__link">
                                    Политика конфиденциальности
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </li>
                     <li className="socials-footer__column">
                        <div className="socials-footer__item item-socials-footer item-socials-footer__block-copyright">
                           <div className="item-socials-footer__title">
                              Небольшое изменение. Большие изменения.
                           </div>
                           <div className="item-socials-footer__copyright">
                              Copyright © 2022
                           </div>
                           <div className="item-socials-footer__text">
                              Этот сайт был создан для дипломного проекта, поэтому
                              некоторые изображения и текст могут быть
                              заимствованы с других сайтов.
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
