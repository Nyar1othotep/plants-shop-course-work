import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const RegistrationForm = () => {
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
                  "Invalid email format."
               )
               .required("Required field."),
            password: Yup.string()
               .required("Required field")
               .min(8, "Password is too short - should be 8 chars minimum.")
               .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
         })}
         onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
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
               placeholder="Password"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Create account
            </button>
         </Form>
      </Formik>
   );
};

export default RegistrationForm;
