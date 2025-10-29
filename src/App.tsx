import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimePage from "./pages/AnimePage";
import Layout from "./components/Layout";
import AnimeDetailPage from "./pages/AnimeDetailPage";

function App() {
  return (
    <Router>
      <Layout>
        {({ searchTerm }) => (
          <Routes>
            <Route path="/" element={<AnimePage searchTerm={searchTerm} />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
}

export default App;
