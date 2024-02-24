import { Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import Layout from './ui/Layout';
import Home from './pages/Home';
import Mens from './pages/Mens';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="mens" element={<Mens />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
