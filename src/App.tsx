import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from './ui/Layout';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Favourites from './pages/Favourites';
import Cart from './pages/Cart';
import Results from './pages/Results';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Orders from './pages/Orders';
import GlobalStyles from './styles/GlobalStyles';
import AuthProtect from './ui/AuthProtect';
import ProtectedRoute from './ui/ProtectedRoute';
import PageNotFound from './ui/PageNotFound';

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
          <Route index element={<Navigate to="new-and-featured" replace />} />
          <Route path="new-and-featured" element={<Catalog />} />
          <Route path="mens" element={<Catalog />} />
          <Route path="mens/:slugId" element={<ProductDetails />} />
          <Route path="womens" element={<Catalog />} />
          <Route path="womens/:slugId" element={<ProductDetails />} />
          <Route path="kids" element={<Catalog />} />
          <Route path="kids/:slugId" element={<ProductDetails />} />
          <Route path="sports" element={<Catalog />} />
          <Route path="sports/:slugId" element={<ProductDetails />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="results" element={<Results />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="signin"
          element={
            <AuthProtect>
              <Auth />
            </AuthProtect>
          }
        />
        <Route
          path="signup"
          element={
            <AuthProtect>
              <Auth />
            </AuthProtect>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
