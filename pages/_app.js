//

import { useMount } from 'react-use';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  useMount(() => {
    return import('bootstrap/dist/js/bootstrap.bundle.min');
  });

  return <Component {...pageProps} />
};

export default MyApp;
