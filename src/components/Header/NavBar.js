import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Badge from "react-bootstrap/Badge"
import { NavLink, useHistory } from "react-router-dom"
import "./NavBar.css"
import { useContext } from "react"
import { myContext } from "../contexto/contexto"
import config from "../../config"

const NavBar = () => {
    const history = useHistory()

    let {administrador, totalAgregado, usuario, fileName, userId} = useContext(myContext)
    let fileSrc = `http://${config.BACK_URI}/public/avatares/${fileName}`

    function desloguear(){
        sessionStorage.removeItem("token")
        history.push("/")
    }

    if (administrador == true){
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <div id="contenedorAvatar">
                        <img id="avatar" src={fileSrc}></img>
                        <span id="tipoUsuario">{usuario} <a id="btnDesloguear" onClick={desloguear}>[Desloguear]</a></span>
                    </div>
                    {/* <Navbar.Brand id="tipoUsuario">{usuario}</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={`/productos/${userId}`}>Productos</NavLink>
                            <NavLink className="nav-link" to={"/nuevo-producto"}>Cargar Producto</NavLink>
                            <NavLink className="nav-link" to={`/carrito/${userId}`}>
                                <i class="bi bi-basket3">
                                    <Badge 
                                        bg="transparent" 
                                        text={totalAgregado > 0 ? "success" : "light"}>
                                            {totalAgregado}
                                    </Badge>
                                </i>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <div id="contenedorAvatar">
                        <img id="avatar" src={fileSrc}></img>
                        <span id="tipoUsuario">{usuario} <a id="btnDesloguear" onClick={desloguear}>[Desloguear]</a></span>
                    </div>
                    {/* <Navbar.Brand id="tipoUsuario">{usuario}</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={`/productos/${userId}`}>Productos</NavLink>
                            <NavLink className="nav-link" to={`/carrito/${userId}`}>
                                <i class="bi bi-basket3">
                                    <Badge 
                                        bg="transparent" 
                                        text={totalAgregado > 0 ? "success" : "light"}>
                                            {totalAgregado}
                                    </Badge>
                                </i>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar