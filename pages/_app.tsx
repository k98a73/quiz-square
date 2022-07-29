import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: any) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
