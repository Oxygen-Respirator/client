import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './router/MainRouter';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <MainRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
