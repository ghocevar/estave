import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'jotai';

import theme from '@/styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Športna loterija - e-stave</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default App;
