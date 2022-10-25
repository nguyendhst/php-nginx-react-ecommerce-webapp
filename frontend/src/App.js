import {
  Route,
  Routes
} from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
