import './css/App.css';
import LogIn from './pages/LogIn.jsx';
import PasswordReset from './pages/PasswordReset';
import HomePage from './pages/HomePage';
import VistaEmpleado from './pages/vistaEmpleado';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<LogIn />} />
            <Route path='/passwordReset' element={<PasswordReset />} />
            <Route path='/homePage' element={<HomePage />} />
            <Route path='/vistaEmpleado' element={<VistaEmpleado />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
