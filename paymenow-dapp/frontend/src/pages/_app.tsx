
import '../../styles/globals.css';
import { Web3Provider } from '../wallet';
import type { AppProps } from 'next/app';
import { queryClient, QueryClientProvider } from '../queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </QueryClientProvider>
  );
}
