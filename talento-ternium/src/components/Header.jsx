import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import terniumLogo from "../img/logo-ternium.png";
import Cookies from "js-cookie";
import BotonSubidaEmpleados from "./BotonSubidaEmpleados";
import BotonSubidaEvaluacionesAnuales from "./BotonSubidaEvaluacionesAnuales";
import BotonRegistro from "./BotonRegistro"
import BotonDescargarFormatosCSV from "./BotonDescargarFormatoCSV"
import {Divider} from "antd";

function Header() {

    const navigate = useNavigate();

    function handleLogOut() {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("user_id", { path: "/" });
        navigate("/");
    }

    const isAdmin = Cookies.get("admin");
    const isSuperAdmin = Cookies.get("super_admin");

    function goHome() {
        navigate("/homePage");
    }

    const renderButtons = () => {
        if (isSuperAdmin === "true") {
            return (
                <>
                    <BotonRegistro  tipoRegistro="rh" />
                    <Divider type="vertical" style={{ height: "2.9em", background: "#eeeeee" }} />
                    <BotonRegistro  tipoRegistro="admin" />
                </>
            )
        } else if (isAdmin === "true") {
          return <BotonRegistro  tipoRegistro="rh" />;
        } else  {
          return (
            <>
              <BotonSubidaEmpleados/>
              <Divider type="vertical" style={{ height: "2.9em", background: "#eeeeee" }} />
              <BotonSubidaEvaluacionesAnuales/>
              <Divider type="vertical" style={{ height: "2.9em", background: "#eeeeee" }} />
              <BotonRegistro  tipoRegistro="empleado" />
              <Divider type="vertical" style={{ height: "2.9em", background: "#eeeeee" }} />
              <BotonDescargarFormatosCSV />
            </>
          );
        }
    };
      

    return (
    <Navbar expand="lg" position="sticky" top="0" style={{ background: "white" }}>
        <Container>
            <div className="d-inline-block align-top" style={{ paddingRight: "10px" }}>
                <Link to="/homePage"><img src={terniumLogo} height="50" alt="Logo Ternium" /></Link>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={goHome}>
                        Inicio
                    </Nav.Link>
                    <Divider type="vertical" style={{height: "2.9em", background: "#eeeeee"}}/>
                    {renderButtons()}
                </Nav>


                <Nav className="ml-auto">
                    <Button onClick={handleLogOut} variant="outline-danger">Cerrar sesión</Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Header;