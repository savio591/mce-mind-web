import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '../styles/globals.scss';
import '../components/Calendar/_calendar.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
