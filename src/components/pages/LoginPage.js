import LoginForm from "../loginForm/LoginForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import {
   getAuth,
   signInWithEmailAndPassword,
   signInWithPopup,
} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";
import { googleAuth, provider } from "../../firebase";

const LoginPage = () => {
   const dispatch = useDispatch();
   let navigate = useNavigate();
   const { isAuth } = useAuth();

   const handleLogin = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
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
      <div className="login-page">
         <div className="login-page__container _container">
            <div className="login-page__body">
               <div className="login-page__btns">
                  <Link to="/user/registration">
                     <button className="login-page__login-btn btn btn--border">
                        <svg>
                           <use href={`${svg}#create`}></use>
                        </svg>
                        <p>Create an account</p>
                     </button>
                  </Link>
               </div>
               <p style={{ color: "#8E8E8E" }}>or</p>
               <LoginForm handleClick={handleLogin} />
               <div className="login-page__to-registration">
                  <p>No account?</p>
                  <Link to="/user/registration">Create one</Link>
               </div>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to="/user/profile" />
   );
};

export default LoginPage;
