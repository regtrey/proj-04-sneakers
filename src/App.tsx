import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from './ui/Layout';
import Home from './pages/Home';
import NewFeatured from './pages/NewFeatured';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Kids from './pages/Kids';
import ProductDetails from './pages/ProductDetails';
import Favourites from './pages/Favourites';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
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
          <Route path="new-and-featured" element={<NewFeatured />} />
          <Route path="mens" element={<Mens />} />
          <Route path="mens/:slugId" element={<ProductDetails />} />
          <Route path="womens" element={<Womens />} />
          <Route path="womens/:slugId" element={<ProductDetails />} />
          <Route path="kids" element={<Kids />} />
          <Route path="kids/:slugId" element={<ProductDetails />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="signin" element={<Auth />} />
        <Route path="signup" element={<Auth />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
