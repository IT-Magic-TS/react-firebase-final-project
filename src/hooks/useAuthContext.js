import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthcontext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext mus be inside an AuthContextProvider");
  }

  return context;
};
