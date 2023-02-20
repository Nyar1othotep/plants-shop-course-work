import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const RegistrationForm = ({ handleClick }) => {
   return (
      <Formik
         initialValues={{
            email: "",
            password: "",
         }}
         validationSchema={Yup.object({
            email: Yup.string()
               .matches(
                  // eslint-disable-next-line
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  "Неверный формат электронной почты."
               )
               .required("Обязательное поле."),
            password: Yup.string()
               .required("Обязательное поле.")
               .min(8, "Пароль слишком короткий — минимум 8 символов.")
               .matches(
                  /[a-zA-Z]/,
                  "Пароль может содержать только латинские буквы."
               ),
         })}
         onSubmit={(values) => handleClick(values.email, values.password)}
      >
         <Form className="login-form form">
            <MyTextInput
               className="form-input"
               id="email"
               name="email"
               type="email"
               autoFocus
               placeholder="Email"
            />
            <MyTextInput
               className="form-input"
               id="password"
               name="password"
               type="password"
               placeholder="Пароль"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Создать аккаунт
            </button>
         </Form>
      </Formik>
   );
};

export default RegistrationForm;
