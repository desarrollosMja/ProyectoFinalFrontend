import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Badge from "react-bootstrap/Badge"
import { NavLink } from "react-router-dom"
import "./NavBar.css"
import { useContext } from "react"
import { myContext } from "../contexto/contexto"

const NavBar = () => {

    let {administrador, totalAgregado, usuario, fileName} = useContext(myContext)
    let fileSrc = `http://localhost:8080/public/avatares/${fileName}`

    if (administrador == true){
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <div id="contenedorAvatar">
                        <img id="avatar" src={fileSrc}></img>
                        <span id="tipoUsuario">{usuario} <a>[Desloguear]</a></span>
                    </div>
                    {/* <Navbar.Brand id="tipoUsuario">{usuario}</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={"/productos"}>Productos</NavLink>
                            <NavLink className="nav-link" to={"/nuevo-producto"}>Cargar Producto</NavLink>
                            <NavLink className="nav-link" to={"/carrito"}>
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
                        <span id="tipoUsuario">{usuario} <a>[Desloguear]</a></span>
                    </div>
                    {/* <Navbar.Brand id="tipoUsuario">{usuario}</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={"/productos"}>Productos</NavLink>
                            <NavLink className="nav-link" to={"/carrito"}>
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