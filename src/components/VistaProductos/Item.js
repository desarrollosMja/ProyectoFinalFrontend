import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { tipoUsuario } from "../contexto/contexto"

const Item = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id, nombre, descripcion, codigo, urlFoto, precio, stock } = props.item
    const URL = `http://localhost:8080/api/productos/${id}`

    const contexto = useContext(tipoUsuario)

    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Borrar item
        </Tooltip>
    );

    const renderTooltipSettings = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Editar item
        </Tooltip>
    );

    const borrarItem = () => {
        fetch(`http://localhost:8080/api/productos/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(json => contexto.setProductos(json.productos))
            .catch(err => console.log(err))
    }

    if (contexto.administrador == true) {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={urlFoto} />
                    <Card.Body>
                        <Card.Title><NavLink to={`/producto/${id}`} className="linkAdetail">{nombre}</NavLink></Card.Title>
                        <Card.Subtitle>Precio: $ {precio}</Card.Subtitle>
                        <Card.Subtitle>Stock: {stock}</Card.Subtitle>
                        <Button variant="dark">Agregar al carrito</Button>
                    </Card.Body>

                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipDelete}
                    >
                        <Button variant="dark" id="btnBorrarItem" onClick={borrarItem}><i class="bi bi-x-lg"></i></Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipSettings}
                    >
                        <Button variant="dark" id="btnModificarItem" onClick={handleShow}><i class="bi bi-gear"></i></Button>
                    </OverlayTrigger>
                </Card>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Modificar artículo</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Form method="post" action="http://localhost:8080/api/productos/5?_method=PUT">
                    <input type="hidden" name="_method" value="PUT"/>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={nombre} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" value={descripcion} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>URL foto</Form.Label>
                                <Form.Control type="text" value={urlFoto} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" value={codigo} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Precio $</Form.Label>
                                <Form.Control type="text" value={precio} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="text" value={stock} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    } else {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={urlFoto} />
                <Card.Body>
                    <Card.Title><NavLink to={`/producto/${id}`} className="linkAdetail">{nombre}</NavLink></Card.Title>
                    <Card.Subtitle>Precio: $ {precio}</Card.Subtitle>
                    <Card.Subtitle>Stock: {stock}</Card.Subtitle>
                    <Button variant="dark">Agregar al carrito</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Item