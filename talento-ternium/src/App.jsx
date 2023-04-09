import './css/App.css';
import LogIn from "./pages/LogIn.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
