import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Product from "./Pages/Product";
import Sidebar from "./components/Sidebar";
import NotFound from "./Pages/404";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
