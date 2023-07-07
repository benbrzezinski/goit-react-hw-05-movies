import { useState } from "react";

const useLoader = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  return [isLoading, setIsLoading];
};

export default useLoader;
