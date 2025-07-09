import { createContext, useState } from "react";

export const LoadingAndErrorContext = createContext();

export const LoadingAndErrorProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <LoadingAndErrorContext.Provider value={{ isLoading, setIsLoading, isError, setIsError }}>
      {children}
    </LoadingAndErrorContext.Provider>
  );
};
