import { useState, useCallback } from "react";
import { getDocs } from "firebase/firestore";

export const useHttp = () => {
   const [process, setProcess] = useState("waiting");

   const request = useCallback(async (query) => {
      setProcess("loading");

      try {
         const data = await getDocs(query);

         return data;
      } catch (error) {

         setProcess("error");
         throw error;
      }
   }, []);

   const clearError = useCallback(() => {
      setProcess("loading");
   }, []);

   return { request, clearError, process, setProcess };
};
