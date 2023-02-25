import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth.hook";
import { removeUser } from "store/slices/userSlice";
import { removeToCart } from "store/slices/toCartSlice";
import { removeToOrderAndDelivery } from "store/slices/toOrderSlice";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ handelClick }) => {
   let navigate = useNavigate();
   const dispatch = useDispatch();
   const { email, userUID, isAdmin } = useAuth();
   const auth = getAuth();

   return (
      <div className="logout">
         <div className="logout__user-email">
            <strong>Email:</strong> {email}
         </div>
         <div className="logout__user-role">
            <strong>Роль:</strong> {isAdmin ? "Админ" : "Покупатель"}
         </div>
         <div className="logout__btns">
            {isAdmin ? (
               <button
                  className="logout__btn btn btn--black"
                  onClick={() => navigate("/user/admin-panel")}
               >
                  Админ панель
               </button>
            ) : null}
            <button
               className="logout__btn btn btn--black"
               onClick={() => {
                  dispatch(removeUser());
                  dispatch(removeToCart());
                  dispatch(removeToOrderAndDelivery());
                  handelClick(userUID, true);
                  signOut(auth);
               }}
            >
               Выйти
            </button>
         </div>
      </div>
   );
};

export default Logout;
