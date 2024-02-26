import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from './ui/Layout';
import Home from './pages/Home';
import Mens from './pages/Mens';
import ProductDetails from './pages/ProductDetails';
import GlobalStyles from './styles/GlobalStyles';

// Setting up react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // In milliseconds
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="mens" element={<Mens />} />
          <Route path="mens/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
