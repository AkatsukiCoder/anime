import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimePage from "./pages/AnimePage";
import Layout from "./layouts/Layout";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AnimePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
