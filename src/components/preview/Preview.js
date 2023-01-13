import { useEffect, useRef } from "react";
import "./preview.scss";
import bg from "../../resourses/img/main-page-bg.jpg";
import svg from "../../resourses/svg/sprites.svg";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

const Preview = () => {
   const previewText = useRef(null);
   const currentPage = useRef(null);
   const btnNext = useRef(null);
	const leftLine = useRef(null);
	const rightLine = useRef(null);

   useEffect(() => {
		gsap.registerPlugin(CustomEase);

      gsap.to(previewText.current, 3, {
         opacity: 1,
         x: "15%",
         ease: "power3.out",
      });

		gsap.to(leftLine.current, 2.5, {
			opacity: 1,
         left: "7%",
         bottom: "10%",
         ease: CustomEase.create("custom", "M0,0 C0,0 0.06,0.155 0.1,0.3 0.13,0.411 0.139,0.463 0.18,0.57 0.211,0.653 0.218,0.671 0.258,0.75 0.274,0.782 0.29,0.808 0.312,0.838 0.331,0.864 0.356,0.905 0.38,0.926 0.413,0.955 0.429,0.988 0.468,1.01 0.484,1.019 0.494,1.058 0.57,1.078 0.624,1.092 0.606,1.099 0.69,1.1 0.716,1.1 0.758,1.11 0.818,1.08 0.87,1.053 0.828,1.026 0.91,1.011 0.943,1.005 1,1 1,1 "),
      });

		gsap.to(rightLine.current, 2.5, {
			opacity: 1,
         right: "7%",
         top: "10%",
         ease: CustomEase.create("custom", "M0,0 C0,0 0.06,0.155 0.1,0.3 0.13,0.411 0.139,0.463 0.18,0.57 0.211,0.653 0.218,0.671 0.258,0.75 0.274,0.782 0.29,0.808 0.312,0.838 0.331,0.864 0.356,0.905 0.38,0.926 0.413,0.955 0.429,0.988 0.468,1.01 0.484,1.019 0.494,1.058 0.57,1.078 0.624,1.092 0.606,1.099 0.69,1.1 0.716,1.1 0.758,1.11 0.818,1.08 0.87,1.053 0.828,1.026 0.91,1.011 0.943,1.005 1,1 1,1 "),
      });

      // gsap.to(btnNext.current, 1, {
      //    repeat: -1,
      //    y: "15",
      //    ease: "circ.in",
      //    yoyo: true,
      // });
   }, []);

   return (
      <div
         className="section preview-page"
         ref={currentPage}
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
               <div className="preview-page__frame preview-page__frame-icon preview-page__frame-icon-left" ref={leftLine}>
                  <svg>
                     <use href={`${svg}#frame`}></use>
                  </svg>
               </div>
               <div className="preview-page__frame preview-page__frame-icon preview-page__frame-icon-right" ref={rightLine}>
                  <svg>
                     <use href={`${svg}#frame`}></use>
                  </svg>
               </div>
               <div className="preview-page__frame preview-page__btn-next" ref={btnNext}>
                  <span>
                     N <br /> e <br /> x <br /> t
                  </span>
                  <svg>
                     <use href={`${svg}#arrow-next`}></use>
                  </svg>
               </div>
               <div className="preview-page__text">
                  <p ref={previewText}>
                     Plants <br /> shop
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Preview;
