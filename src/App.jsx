import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Learn from "./pages/Learn.jsx";
import Favorites from "./pages/Favorites.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
