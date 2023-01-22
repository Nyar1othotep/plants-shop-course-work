import LoginForm from "../loginForm/LoginForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";

const LoginPage = () => {
   return (
      <div className="login-page">
         <div className="login-page__container _container">
            <div className="login-page__body">
               <button className="login-page__login-with-google-btn btn btn--border">
                  <svg>
                     <use href={`${svg}#google`}></use>
                  </svg>
                  <p>Continue with Google</p>
               </button>
               <p style={{ color: "#8E8E8E" }}>or</p>
               <LoginForm />
               <div className="login-page__to-registration">
                  <p>No account?</p>
                  <Link to="/user/registration">Create one</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
