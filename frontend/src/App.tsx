import "./App.css"; 
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
