import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";
import svg from "../../resourses/svg/sprites.svg";

const BuyForm = ({ setIsBuy, isBuy, onClose, handleBuy }) => {
   return (
      <Formik
         initialValues={{
            credit: "",
            dateCard: "",
            cv: "",
         }}
         validationSchema={Yup.object({
            credit: Yup.string()
               .required("Обязательное поле.")
               .min(16, "Минимум 16 символ."),
            dateCard: Yup.string()
               .required("Обязательное поле.")
               .min(4, "Минимум 4 символ."),
            cv: Yup.string()
               .required("Обязательное поле.")
               .min(3, "Минимум 3 символ."),
         })}
         onSubmit={(values, { resetForm }) => {
            onClose();
            resetForm({});
            setIsBuy((isBuy) => true);
            handleBuy();
         }}
      >
         <Form className="add-category-form form">
            <div className="form__close" onClick={() => onClose()}>
               <svg>
                  <use href={`${svg}#remove`}></use>
               </svg>
            </div>
            <MyTextInput
               className="form-input"
               id="credit"
               name="credit"
               type="text"
               placeholder="1234 5678 9123 4567"
            />
            <div className="proceed-to-checkout-form__row">
               <MyTextInput
                  className="form-input"
                  id="dateCard"
                  name="dateCard"
                  type="text"
                  placeholder="Срок действия - 01/23"
               />
               <MyTextInput
                  className="form-input"
                  id="cv"
                  name="cv"
                  type="text"
                  placeholder="CVC2/CVV2"
               />
            </div>
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Оплатить
            </button>
         </Form>
      </Formik>
   );
};

export default BuyForm;
