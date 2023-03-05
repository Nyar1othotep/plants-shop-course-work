import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const ProceedToCheckoutForm = ({ handleClick }) => {
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
               .min(2, "Должно быть минимум 2 символа.")
               .required("Обязательное поле."),
            office: Yup.string()
               .min(2, "Должно быть минимум 2 символа.")
               .required("Обязательное поле."),
            index: Yup.string()
               .min(2, "Должно быть минимум 2 символа.")
               .required("Обязательное поле."),
            name: Yup.string()
               .min(2, "Должно быть минимум 2 символа.")
               .required("Обязательное поле."),
            phoneNumber: Yup.string()
               .min(2, "Должно быть минимум 2 символа.")
               .required("Обязательное поле."),
         })}
         onSubmit={(values) =>
            handleClick(
               values.address,
               values.office,
               values.index,
               values.name,
               values.phoneNumber
            )
         }
      >
         <Form className="proceed-to-checkout-form form">
            <MyTextInput
               className="form-input"
               label="Адрес доставки:"
               id="address"
               name="address"
               type="text"
               autoFocus
               placeholder="Страна, город, улица, дом"
            />
            <div className="proceed-to-checkout-form__row">
               <MyTextInput
                  className="form-input"
                  id="office"
                  name="office"
                  type="text"
                  placeholder="Квартира/офис"
               />
               <MyTextInput
                  className="form-input"
                  id="index"
                  name="index"
                  type="text"
                  placeholder="Индекс"
               />
            </div>
            <MyTextInput
               className="form-input"
               label="Данные получателя:"
               id="name"
               name="name"
               type="text"
               placeholder="Имя и фамилия"
            />
            <MyTextInput
               className="form-input"
               id="phoneNumber"
               name="phoneNumber"
               type="number"
               placeholder="Номер телефона"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Перейти к оплате
            </button>
         </Form>
      </Formik>
   );
};

export default ProceedToCheckoutForm;
