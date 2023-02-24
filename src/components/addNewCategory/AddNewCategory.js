import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const AddNewCategory = ({ handleClick, onClose }) => {
   return (
      <Formik
         initialValues={{
            title: "",
         }}
         validationSchema={Yup.object({
            title: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
         })}
         onSubmit={(values, { resetForm }) => {
            handleClick(values.title);
            resetForm({});
            onClose();
         }}
      >
         <Form className="add-category-form form">
            <MyTextInput
               className="form-input"
               id="title"
               name="title"
               type="text"
               placeholder="Название категории"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Добавить
            </button>
         </Form>
      </Formik>
   );
};

export default AddNewCategory;
