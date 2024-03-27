import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Learn from "./pages/Learn.jsx";
import Favorites from "./pages/Favorites.jsx";
import { useState } from "react";
import InfoTicker from "./components/common/InfoTicker.jsx";

function App() {
  const [favorites, setFavorites] = useState({});

  return (
    <Router>
      <InfoTicker />
      <Routes>
        <Route exact path="/" element={<Index setFavorites={setFavorites} />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
      </Routes>
    </Router>
  );
}

export default App;
