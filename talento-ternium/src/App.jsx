import "./css/App.css";
import LogIn from "./pages/LogIn.jsx";
import PasswordReset from "./pages/PasswordReset";
import HomePage from "./pages/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./pages/EmployeePage";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES"



function App() {
  return (
    <ConfigProvider locale={esES}>
      <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/passwordReset" element={<PasswordReset />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  )
}

export default App
