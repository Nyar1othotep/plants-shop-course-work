import RegistrationForm from "../registrationForm/RegistrationForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
   const dispatch = useDispatch();
	let navigate = useNavigate();

   const handleRegister = (email, password) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            dispatch(
               setUser({
                  email: user.email,
                  userUID: user.uid,
                  token: user.accessToken,
               })
            );
				navigate("/user/profile");
         })
         .catch(console.error);
   };

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
               <RegistrationForm handleClick={handleRegister} />
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
