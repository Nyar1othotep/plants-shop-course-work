import RegistrationForm from "../registrationForm/RegistrationForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
   return (
      <div className="registration-page">
         <div className="registration-page__container _container">
            <div className="registration-page__body">
               <button className="registration-page__registration-with-google-btn btn btn--border">
                  <svg>
                     <use href={`${svg}#google`}></use>
                  </svg>
                  <p>Continue with Google</p>
               </button>
               <p style={{ color: "#8E8E8E" }}>or</p>
               <RegistrationForm />
               <div className="registration-page__to-registration">
                  <p>Already have an account?</p>
                  <Link to="/user/login">Log in</Link>
               </div>
               <span>
                  By clicking "Create account", I agree to Plants`s TOS and
                  Privacy Policy
               </span>
            </div>
         </div>
      </div>
   );
};

export default RegistrationPage;
