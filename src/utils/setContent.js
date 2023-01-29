// import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";

const setContent = (process, Component, data) => {
   switch (process) {
      case "waiting":
         return true;
      case "loading":
         return <Spinner />;
      case "confirmed":
         return <Component data={data} />;
      case "error":
         return console.log("error");
      default:
         throw new Error("Unexpected process state");
   }
};

export default setContent;
