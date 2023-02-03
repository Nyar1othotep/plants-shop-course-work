import RegistrationForm from "../registrationForm/RegistrationForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";

const RegistrationPage = () => {
   const dispatch = useDispatch();
   let navigate = useNavigate();
   const { isAuth } = useAuth();

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

   return !isAuth ? (
      <div className="registration-page">
         <div className="registration-page__container _container">
            <div className="registration-page__body">
               <div className="registration-page__btns">
                  <Link to="/user/login">
                     <button className="registration-page__login-btn btn btn--border">
                        <svg>
                           <use href={`${svg}#create`}></use>
                        </svg>
                        <p>Go to Log in</p>
                     </button>
                  </Link>
               </div>
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
   ) : (
      <Navigate to="/user/profile" />
   );
};

export default RegistrationPage;
