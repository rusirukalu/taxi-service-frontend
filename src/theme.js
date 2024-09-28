import { extendTheme } from "@chakra-ui/react";

// Ensure breakpoints are included in the theme
const theme = extendTheme({
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
  // Add any other customizations to your theme here
});

export default theme;