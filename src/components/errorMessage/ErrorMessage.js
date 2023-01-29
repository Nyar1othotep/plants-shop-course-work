import img from "../../resourses/img/error.gif";

const ErrorMessage = () => {
   return (
      <img className="error-message"
         style={{
            display: "block",
            width: "250px",
            height: "250px",
            objectFit: "contain",
            margin: "0 auto",
         }}
         src={img}
         alt="error"
      />
   );
};

export default ErrorMessage;
