import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import '../components/Calendar/_calendar.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
