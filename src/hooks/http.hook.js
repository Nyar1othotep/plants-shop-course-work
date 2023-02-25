import { useState, useCallback } from "react";
import { getDocs, getDoc } from "firebase/firestore";

export const useHttp = () => {
   const [process, setProcess] = useState("waiting");

   const request = useCallback(async (query, one = false) => {
      setProcess("loading");

      try {
         let data;
         one ? (data = await getDoc(query)) : (data = await getDocs(query));

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
