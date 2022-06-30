import "./carrito.css"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { myContext } from "../contexto/contexto"
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button"
import Tooltip from "react-bootstrap/esm/Tooltip"
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"
import Swal from 'sweetalert2'
import config from "../../config"

const Carrito = () => {

    let {
        carrito, 
        setCarrito, 
        idCarrito, 
        setIdCarrito, 
        removeItem, 
        clearCart, 
        totalAgregado, 
        setTotalAgregado,
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        usuario,
        setAdministrador,
        setFileName,
        setUsuario,
        userPhone,
        setUserPhone
    } = useContext(myContext)

    const token = sessionStorage.getItem("token")
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const params = useParams()
    const userObj = {
        nombre: usuario,
        email: userEmail,
        telefono: userPhone
    }

    if (params.userId != undefined) setUserId(params.userId)

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

    const comprar = () => {
        setShowSpinner(true)
        const total_a_pagar = carrito.reduce((acc, item) => acc + item.item.precio * item.item.addedToCart, 0)
        fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/new-operation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({carrito: carrito, user: userObj, total: total_a_pagar}),
            mode: "cors"
        })
            .then(res => res.json())
            .then(json => {
                if (json.success == true) {
                    setShowSpinner(false)
                    Swal.fire({
                        title: 'Orden enviada con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "green"
                    })
                        .then(res => {
                            if (res.isConfirmed == true) {
                                clearCart()
                                history.push(`/productos/${userId}`)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setCarrito(carrito)

        setInterval(() => {
            window.location.reload()
        }, 300000)

        fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/usuarios/verify-token`, {
            headers: {
                authorization: token
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.session == false) history.push("/")
            if (json.session == true){
                setUsuario(json.user.nombre)
                setUserEmail(json.user.email)
                setFileName(json.user.foto)
                setAdministrador(json.user.administrador)
                setUserPhone(`+${json.user.prefijo}${json.user.telefono}`)
            }
        })
        .catch(err => console.log(err))
    } , [carrito,token])


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
                    fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${id}/products`)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json)
                        let data = []
                        for (const item of json.item) {
                            data.push({item: item})
                        }
                        let cantidadAgregadaAlCarrito = 0
                        data.forEach(elem => {
                            cantidadAgregadaAlCarrito += elem.item.addedToCart
                        })
                        setTotalAgregado(parseInt(cantidadAgregadaAlCarrito))
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
            <div className="contenedorFlex">
                {showSpinner == true && <Spinner animation="grow" variant="dark" id="spinner"/>}
                <Table >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad a comprar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map(producto =>
                            <tr key={producto.item.id}>
                                <td><img src={producto.item.urlFoto}></img></td>
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
                                            removeItem(producto.item._id)
                                            if (carrito.length > 0){
                                                fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${idCarrito}/products/${producto.item._id}`, {
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
                                            setTotalAgregado(++totalAgregado)
                                            producto.item.addedToCart++
                                            fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${idCarrito}/${producto.item._id}`, {
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
                <div id="contenedorFinalizarCompra">
                    <h5>TOTAL: $ {carrito.reduce((acc, item) => acc + item.item.precio * item.item.addedToCart, 0)}</h5>
                    <Button variant="success" className="btn-finalizar" onClick={comprar}>Finalizar compra</Button>
                    <Button variant="danger" className="btn-vaciar" onClick={() => {
                        clearCart()
                    }}>
                        Vaciar carrito
                    </Button>
                    <h6>Código carrito</h6>
                    <strong>{idCarrito}</strong>
                </div>            
            </div>
        )
    }
}

export default Carrito