import "./preview.scss";
import bg from "../../resourses/img/main-page-bg.jpg";

const Preview = () => {
   return (
      <div
         className="section preview-page"
         style={{
            background: `url(${bg}) center center`,
            backgroundSize: "cover",
         }}
      >
         <div className="preview-page__container _container">
				<div className="preview-page__body">
					<div className="preview-page__heading">Plants <br/> shop</div>
				</div>
			</div>
      </div>
   );
};

export default Preview;
