import LoginForm from "../loginForm/LoginForm";
import svg from "../../resourses/svg/sprites.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import {
   getAuth,
   signInWithEmailAndPassword,
   sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.hook";
import Helmet from "react-helmet";
import { useAlert } from "react-alert";
import Popup from "reactjs-popup";
import PasswordResetEnterEmail from "components/passwordResetEnterEmail/passwordResetEnterEmail";

const LoginPage = () => {
   const auth = getAuth();
   const alert = useAlert();
   const dispatch = useDispatch();
   let navigate = useNavigate();
   const { isAuth } = useAuth();

   const sendResetPassword = (email) => {
      sendPasswordResetEmail(auth, email)
         .then(() => {
            alert.success("Письмо для сброса пароля отправлено!");
         })
         .catch((error) => {
            let errors = (function () {
               let index = error.message.indexOf("(");
               return index > -1 ? error.message.slice(index) : error.message;
            })();
            alert.error(errors);
         });
   };

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
         .catch((error) => {
            let errors = (function () {
               let index = error.message.indexOf("(");
               return index > -1 ? error.message.slice(index) : error.message;
            })();
            alert.error(errors);
         });
   };

   return !isAuth ? (
      <>
         <Helmet>
            <meta name="description" content={`Plants shop - авторизация`} />
            <title>Plants shop - авторизация</title>
         </Helmet>
         <div className="login-page">
            <div className="login-page__container _container">
               <div className="login-page__body">
                  <div className="login-page__btns">
                     <Link to="/user/registration">
                        <button className="login-page__login-btn btn btn--border">
                           <svg>
                              <use href={`${svg}#create`}></use>
                           </svg>
                           <p>Создать аккаунт</p>
                        </button>
                     </Link>
                  </div>
                  <p style={{ color: "#8E8E8E" }}>или</p>
                  <LoginForm handleClick={handleLogin} />
                  <div className="login-page__to-registration">
                     <p>Нет аккаунта?</p>
                     <Link to="/user/registration">Создай</Link>
                  </div>
                  <Popup
                     trigger={
                        <div
                           className="login-page__forgot"
                           onClick={() => sendResetPassword()}
                        >
                           Забыли пароль?
                        </div>
                     }
                     position="top left"
                     lockScroll
                     closeOnEscape
                     modal
                  >
                     {(close) => (
                        <PasswordResetEnterEmail
                           handleClick={sendResetPassword}
                           onClose={close}
                        />
                     )}
                  </Popup>
               </div>
            </div>
         </div>
      </>
   ) : (
      <Navigate to="/user/profile" />
   );
};

export default LoginPage;
