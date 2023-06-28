const { extendTheme } = require("@chakra-ui/react");

const theme = extendTheme({
    colors: {
      primary: {
        50: '#F2F6FE',
        100: '#DAE5FD',
        200: '#B7C9FB',
        300: '#95ADEF',
        400: '#6B85E7',
        500: '#4D6AE1',
        600: '#4051BF',
        700: '#303F92',
        800: '#202B63',
        900: '#10183A',
      },
      secondary: '#FFD700',
    },
  });

  export default theme;