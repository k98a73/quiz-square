import { extendTheme } from "@chakra-ui/react";

export const modalTheme = extendTheme({
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          maxWidth: "90%",
          minWidth: "90%",
        },
      }),
    },
  },
});
