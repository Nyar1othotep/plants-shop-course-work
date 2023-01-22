import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const ProceedToCheckoutForm = () => {
   return (
      <Formik
         initialValues={{
            address: "",
            office: "",
            index: "",
            name: "",
            phoneNumber: "",
         }}
         validationSchema={Yup.object({
            address: Yup.string()
               .min(2, "Should be 2 chars minimum.")
               .required("Required field."),
            office: Yup.string()
               .min(2, "Should be 2 chars minimum.")
               .required("Required field."),
            index: Yup.string()
               .min(2, "Should be 2 chars minimum.")
               .required("Required field."),
            name: Yup.string()
               .min(2, "Should be 2 chars minimum.")
               .required("Required field."),
            phoneNumber: Yup.string()
               .min(2, "Should be 2 chars minimum.")
               .required("Required field."),
         })}
         onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
      >
         <Form className="proceed-to-checkout-form form">
            <MyTextInput
               className="form-input"
               label="Delivery address:"
               id="address"
               name="address"
               type="text"
               autoFocus
               placeholder="Country, city, street, house"
            />
            <div>
               <MyTextInput
                  className="form-input"
                  id="office"
                  name="office"
                  type="text"
                  placeholder="Apartment/office"
               />
               <MyTextInput
                  className="form-input"
                  id="index"
                  name="index"
                  type="text"
                  placeholder="Index"
               />
            </div>
            <MyTextInput
               className="form-input"
               label="Recipient data:"
               id="name"
               name="name"
               type="text"
               placeholder="First and last name"
            />
            <MyTextInput
               className="form-input"
               id="phoneNumber"
               name="phoneNumber"
               type="number"
               placeholder="Phone number"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Pay
            </button>
         </Form>
      </Formik>
   );
};

export default ProceedToCheckoutForm;
