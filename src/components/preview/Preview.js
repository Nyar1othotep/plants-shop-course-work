import "./preview.scss";
import bg from "../../resourses/img/main-page-bg.jpg";
import svg from "../../resourses/svg/sprites.svg";

const Preview = () => {
   return (
      <section
         className="preview-page"
         style={{
            background: `url(${bg}) center center`,
            backgroundSize: "cover",
         }}
      >
         <div className="preview-page__container _container">
            <div className="preview-page__body">
               <div className="preview-page__frame preview-page__logo logo">
                  <svg>
                     <use href={`${svg}#logo`}></use>
                  </svg>
                  <span>Plants</span>
               </div>
               <div className="preview-page__frame preview-page__frame-icon preview-page__frame-icon-left">
                  <svg>
                     <use href={`${svg}#frame`}></use>
                  </svg>
               </div>
               <div className="preview-page__frame preview-page__frame-icon preview-page__frame-icon-right">
                  <svg>
                     <use href={`${svg}#frame`}></use>
                  </svg>
               </div>
               <div className="preview-page__frame preview-page__btn-next">
                  <span>
                     N <br /> e <br /> x <br /> t
                  </span>
                  <svg>
                     <use href={`${svg}#arrow-next`}></use>
                  </svg>
               </div>
               <div className="preview-page__text">
                  <h1>
                     Plants <br /> shop
                  </h1>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Preview;
