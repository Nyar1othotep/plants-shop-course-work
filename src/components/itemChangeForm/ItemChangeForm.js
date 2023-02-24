import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../utils/MyTextInput";

const ItemChangeForm = ({
   handleClick,
   onClose,
   description,
   place,
   quantity,
   light,
   price,
   heightWith,
   img,
   category,
   name,
   plantType,
   numberOfOrders,
   id,
   roomTemperature,
   categoriesArray,
}) => {
   return (
      <Formik
         initialValues={{
            description,
            place,
            quantity,
            light,
            price,
            heightWith,
            img,
            category,
            name,
            plantType,
            numberOfOrders,
            id,
            roomTemperature,
         }}
         validationSchema={Yup.object({
            description: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            place: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            quantity: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            light: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            price: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            heightWith: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            img: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            category: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            name: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            plantType: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            numberOfOrders: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            id: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
            roomTemperature: Yup.string()
               .required("Обязательное поле.")
               .min(1, "Минимум 1 символ."),
         })}
         onSubmit={(values, { resetForm }) => {
            handleClick(
               values.description,
               values.place,
               values.quantity,
               values.light,
               values.price,
               values.heightWith,
               values.img,
               values.category,
               values.name,
               values.plantType,
               values.numberOfOrders,
               values.id,
               values.roomTemperature
            );
            resetForm({});
            onClose();
         }}
      >
         <Form className="item-change-form add-category-form form">
            <strong>ID товара: {id}</strong>
            <MyTextInput
               label="Название товара"
               className="form-input"
               id="name"
               name="name"
               type="text"
               placeholder="Название товара"
            />
            <MyTextInput
               label="Описание товара"
               className="form-input"
               id="description"
               name="description"
               type="text"
               placeholder="Описание товара"
            />
            <MyTextInput
               label="Изображение товара"
               className="form-input"
               id="img"
               name="img"
               type="text"
               placeholder="Изображение товара"
            />
            <label htmlFor={category}>Категория товара</label>
            <Field id="category" name="category" as="select">
               {categoriesArray.map((item) => {
                  return (
                     <option value={item.category} key={item.id}>
                        {item.category}
                     </option>
                  );
               })}
            </Field>
            <MyTextInput
               label="Количество товара"
               className="form-input"
               id="quantity"
               name="quantity"
               type="number"
               placeholder="Количество товара"
            />
            <MyTextInput
               label="Количество заказов"
               className="form-input"
               id="numberOfOrders"
               name="numberOfOrders"
               type="number"
               placeholder="Количество заказов"
            />
            <MyTextInput
               label="Цена товара"
               className="form-input"
               id="price"
               name="price"
               type="text"
               placeholder="Цена товара"
            />
            <MyTextInput
               label="Тип товара"
               className="form-input"
               id="plantType"
               name="plantType"
               type="text"
               placeholder="Тип товара"
            />
            <MyTextInput
               label="Место в помещении"
               className="form-input"
               id="place"
               name="place"
               type="text"
               placeholder="Место в помещении"
            />
            <MyTextInput
               label="Высота"
               className="form-input"
               id="heightWith"
               name="heightWith"
               type="text"
               placeholder="Высота"
            />
            <MyTextInput
               label="Свет"
               className="form-input"
               id="light"
               name="light"
               type="text"
               placeholder="Свет"
            />
            <MyTextInput
               label="Температура в помещении"
               className="form-input"
               id="roomTemperature"
               name="roomTemperature"
               type="text"
               placeholder="Температура в помещении"
            />
            <button
               className="proceed-to-checkout-form__btn btn btn--black"
               type="submit"
            >
               Изменить
            </button>
         </Form>
      </Formik>
   );
};

export default ItemChangeForm;
