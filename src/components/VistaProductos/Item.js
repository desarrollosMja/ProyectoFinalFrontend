import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { myContext } from "../contexto/contexto"
import axios from "axios"
import config from "../../config"

const Item = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { _id, nombre, descripcion, codigo, urlFoto, precio, stock } = props.item
    const URL = `http://${config.BACK_URI}/api/products/${_id}`

    const contexto = useContext(myContext)
    const administrador = contexto.administrador

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
        fetch(`http://${config.BACK_URI}/api/products/${_id}`, { 
            method: 'DELETE', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({administrador})
        })
            .then(res => res.json())
            .then(json => contexto.setProductos(json))
            .catch(err => console.log(err))
    }

    const modificarDatos = (e) => {
        e.preventDefault()
        const datos = {
            _id: _id,
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
            codigo: e.target.codigo.value,
            urlFoto: e.target.urlFoto.value,
            precio: e.target.precio.value,
            stock: e.target.stock.value,
            administrador: administrador
        }

        axios.put(URL, datos)
            .then(res => {
                const {data} = res
                contexto.setProductos(data)
                handleClose()
            })
            .catch(err => console.log(err))
    }

    if (contexto.administrador == true) {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={urlFoto} />
                    <Card.Body>
                        <Card.Title><NavLink to={`/producto/${_id}`} className="linkAdetail">{nombre}</NavLink></Card.Title>
                        <Card.Subtitle>Precio: $ {precio}</Card.Subtitle>
                        <Card.Subtitle>Stock: {stock}</Card.Subtitle>
                        <Button variant="dark" onClick={() => contexto.addItem(props.item)}>Agregar al carrito</Button>
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
                    <Form onSubmit={(e) => modificarDatos(e)}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder={nombre} name="nombre" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" placeholder={descripcion} name="descripcion" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>URL foto</Form.Label>
                                <Form.Control type="text" placeholder={urlFoto} name="urlFoto" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" placeholder={codigo} name="codigo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Precio $</Form.Label>
                                <Form.Control type="text" placeholder={precio} name="precio" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="text" placeholder={stock} name="stock" />
                            </Form.Group>

                            <Button variant="primary" type="submit" >
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
                    <Card.Title><NavLink to={`/producto/${_id}`} className="linkAdetail">{nombre}</NavLink></Card.Title>
                    <Card.Subtitle>Precio: $ {precio}</Card.Subtitle>
                    <Card.Subtitle>Stock: {stock}</Card.Subtitle>
                    <Button variant="dark" onClick={() => contexto.addItem(props.item)}>Agregar al carrito</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Item