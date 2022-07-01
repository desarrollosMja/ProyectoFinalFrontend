import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import config from "../../config"
export const myContext = createContext()
const { Provider } = myContext

export const MyContextProvider = ({ children }) => {
    const history = useHistory()
    const [administrador, setAdministrador] = useState(true)
    let [productos, setProductos] = useState([])
    let [carrito, setCarrito] = useState([])
    let [totalAgregado, setTotalAgregado] = useState(0)
    let [idCarrito, setIdCarrito] = useState()
    let [usuario, setUsuario] = useState()
    let [fileName, setFileName] = useState()
    let [userId, setUserId] = useState()
    let [userEmail, setUserEmail] = useState()
    let [userPhone, setUserPhone] = useState()

    let arrayAuxiliar = []

    const addItem = item => {
        if (isInCart(item._id)){
            for (const producto of carrito) {
                if (producto.item._id == item._id) {
                    producto.item.addedToCart++
                    const itemAux = producto.item
                    fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${idCarrito}/${producto.item._id}`, {
                        method: "post", 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({itemAux})
                    })
                    setTotalAgregado(++totalAgregado)
                    return
                }
            }
        } else {
            arrayAuxiliar = carrito
            item.addedToCart = 1
            arrayAuxiliar.push({item})
            setCarrito(arrayAuxiliar)
            setTotalAgregado(++totalAgregado)
        }

        if (idCarrito == undefined) {
            fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts`, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({item})})
                .then(res => res.json())
                .then(json => setIdCarrito(json.idCarrito))
                .catch(err => console.log(err))
        } else{
            fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${idCarrito}/products`, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({item})})
        }
    }

    const removeItem = itemId => {
        arrayAuxiliar = carrito
        arrayAuxiliar.forEach((elemento, indice, array) => {
            console.log(elemento.item)
            console.log(itemId)
            if (elemento.item._id == itemId) {
                setTotalAgregado(totalAgregado - elemento.item.addedToCart)
                arrayAuxiliar.splice(indice,1)
            }
        })
        setCarrito(arrayAuxiliar)
    }

    const clearCart = async () => {
        setTotalAgregado(0)
        setIdCarrito(undefined)
        setCarrito([])
        await fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/carts/${idCarrito}`, {
            method: "delete", 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({carrito})
        })
    }

    const isInCart = itemId => {
        if (carrito.find(elemento => elemento.item._id == itemId)) return true;
        else return false
    }

    const valorDelContexto = {
        administrador: administrador,
        setAdministrador: setAdministrador,
        productos: productos,
        setProductos: setProductos,
        carrito: carrito,
        setCarrito: setCarrito,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart,
        idCarrito: idCarrito,
        setIdCarrito: setIdCarrito,
        totalAgregado: totalAgregado,
        setTotalAgregado: setTotalAgregado,
        usuario: usuario,
        setUsuario: setUsuario,
        fileName: fileName,
        setFileName: setFileName,
        userId: userId,
        setUserId: setUserId,
        userEmail: userEmail,
        setUserEmail: setUserEmail,
        userPhone: userPhone, 
        setUserPhone: setUserPhone
    }

    useEffect(() => {
        fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/products`)
            .then(res => res.json())
            .then(json => setProductos(json))
            .catch(err => console.log(err))
    },[config])

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}

