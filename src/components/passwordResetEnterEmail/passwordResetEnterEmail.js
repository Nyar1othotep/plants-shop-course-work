import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const PasswordResetEnterEmail = ({ handleClick, onClose }) => {
   return (
      <Formik
         initialValues={{
            email: "",
         }}
         validationSchema={Yup.object({
            email: Yup.string()
               .matches(
                  // eslint-disable-next-line
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  "Неверный формат почты."
               )
               .required("Обязательное поле."),
         })}
         onSubmit={(values, { resetForm }) => {
            handleClick(values.email);
            resetForm({});
            onClose();
         }}
      >
         <Form className="add-category-form form">
            <div className="form-info" style={{ textAlign: "center" }}>
               На вашу электронную почту будет отправлено письмо для сброса
               пароля.
            </div>
            <MyTextInput
               className="form-input"
               id="email"
               name="email"
               type="email"
               autoFocus
               placeholder="Email"
            />
            <button className="btn btn--black" type="submit">
               Отправить письмо
            </button>
         </Form>
      </Formik>
   );
};

export default PasswordResetEnterEmail;
