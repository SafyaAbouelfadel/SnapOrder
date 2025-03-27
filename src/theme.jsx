export const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // light mode palette values
          }
        : {
            // dark mode palette values
          }),
    },
  });

  export const tokens = (mode) => ({
    primary: {
      400: mode === "dark" ? "#1e1e2f" : "#ffffff",
    },
    blueAccent: {
      700: mode === "dark" ? "#00509e" : "#007bff",
    },
    greenAccent: {
      500: mode === "dark" ? "#00c853" : "#4caf50",
      600: mode === "dark" ? "#00b248" : "#43a047",
    },
    grey: {
      100: mode === "dark" ? "#f5f5f5" : "#212121",
    },
  });