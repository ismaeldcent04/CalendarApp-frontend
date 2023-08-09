export const getEnvVariables = () => {
  // import.meta.env;

  return {
    VITE_API_URL: import.meta.en.VITE_API_URL,
  };
};
