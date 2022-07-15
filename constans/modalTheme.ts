import { extendTheme } from "@chakra-ui/react";

export const modalTheme = extendTheme({
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          maxWidth: "100%",
          minWidth: "95%",
        },
      }),
    },
  },
});
