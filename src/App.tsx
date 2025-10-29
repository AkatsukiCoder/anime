import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimePage from "./pages/AnimePage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import Layout from "./components/Layout";
import { ROUTES } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<AnimePage />} />
          <Route path={ROUTES.ANIME_DETAIL} element={<AnimeDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
