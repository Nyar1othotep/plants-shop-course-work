import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth.hook";
import { removeUser } from "store/slices/userSlice";
import { removeToCart } from "store/slices/toCartSlice";
import { removeToOrderAndDelivery } from "store/slices/toOrderSlice";
import { signOut, getAuth } from "firebase/auth";

const Logout = ({ handelClick }) => {
   const dispatch = useDispatch();
   const { email, userUID } = useAuth();
   const auth = getAuth();

   return (
      <div className="logout">
         <div className="logout__user-email">
            <strong>Email:</strong> {email}
         </div>
         <div className="logout__user-role">
            <strong>Role:</strong> customer
         </div>
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
            Log out
         </button>
      </div>
   );
};

export default Logout;
