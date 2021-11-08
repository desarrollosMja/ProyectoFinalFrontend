import "./carrito.css"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { myContext } from "../contexto/contexto"
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button"
import Tooltip from "react-bootstrap/esm/Tooltip"
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger"
import Form from "react-bootstrap/Form"

const Carrito = () => {

    const {carrito, setCarrito, idCarrito, setIdCarrito, removeItem, clearCart} = useContext(myContext)
    const history = useHistory()
    const [open, setOpen] = useState(false);

    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Quitar del carrito
        </Tooltip>
    );

    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Agregar unidades al carrito
        </Tooltip>
    );

    useEffect(() => {
        setCarrito(carrito)
    } , [carrito])


    if (carrito.length == 0) {
        return (
            <div className="carrito">
                <h2>Carrito de compras</h2>
                <p>No hay productos en el carrito</p>
                <Button variant="dark" onClick={() => {
                    document.getElementById("formularioBusquedaCarrito").hidden = false
                }}>
                    Cargar carrito guardado
                </Button>
                <Form hidden={true} id="formularioBusquedaCarrito" onSubmit={(e) => {
                    e.preventDefault()
                    const id = document.getElementById("idCarritoIngresado").value
                    fetch(`http://localhost:8080/api/carrito/${id}/productos`)
                    .then(response => response.json())
                    .then(json => {
                        let data = []
                        for (const item of json.items) {
                            data.push({item: item})
                        }
                        setIdCarrito(id)
                        setCarrito(data)
                    })
                }}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control type="text" placeholder="Ingrese ID del carrito" name="idCarritoIngresado" id="idCarritoIngresado" />
                    </Form.Group>
                    <Button variant="dark" type="submit" id="btnEnviarID">
                        Enviar
                    </Button>
                </Form>
            </div>
        )
    } else {
        return (
            <>
                <Table >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad a comprar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map(producto =>
                            <tr key={producto.item.id}>
                                <td>{producto.item.nombre}</td>
                                <td>{producto.item.precio}</td>
                                <td>{producto.item.addedToCart}</td>
                                <td>                                    
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipDelete}
                                    >
                                       <i class="bi bi-trash" onClick={() => {
                                            removeItem(producto.item.id)
                                            if (carrito.length > 0){
                                                fetch(`http://localhost:8080/api/carrito/${idCarrito}/productos/${producto.item.id}`, {
                                                    method: "delete", 
                                                    headers: {'Content-Type': 'application/json'}, 
                                                    body: JSON.stringify({item: producto.item})
                                                })
                                            } else{
                                                clearCart()
                                            }
                                            history.push("/carrito")
                                        }}></i>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipAdd}
                                    >
                                        <i class="bi bi-bag-plus" onClick={() => {
                                            producto.item.addedToCart++
                                            fetch(`http://localhost:8080/api/carrito/${idCarrito}/${producto.item.id}`, {
                                                method: "post", 
                                                headers: {'Content-Type': 'application/json'}, 
                                                body: JSON.stringify({item: producto.item})
                                            })
                                            history.push("/carrito")
                                        }}></i>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        )}                  
                    </tbody>
                </Table>
                <Button variant="success" className="btn">Finalizar compra</Button>
                <Button variant="danger" className="btn" onClick={() => {
                    clearCart()
                }}>
                    Vaciar carrito
                </Button>            
            </>
        )
    }
}

export default Carrito