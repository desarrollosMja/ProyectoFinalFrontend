import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
export const myContext = createContext()
const { Provider } = myContext

export const MyContextProvider = ({ children }) => {
    const history = useHistory()
    const [administrador, setAdministrador] = useState(true)
    let [productos, setProductos] = useState([])
    let [carrito, setCarrito] = useState([])
    let [idCarrito, setIdCarrito] = useState()

    let arrayAuxiliar = []
    console.log(idCarrito)

    const addItem = item => {
        if (isInCart(item.id)){
            for (const producto of carrito) {
                if (producto.item.id == item.id) {
                    producto.item.addedToCart++
                    fetch(`http://localhost:8080/api/carrito/${idCarrito}/${producto.item.id}`, {
                        method: "post", 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({item: producto.item})
                    })
                    return
                }
            }
        } else {
            arrayAuxiliar = carrito
            item.addedToCart = 1
            arrayAuxiliar.push({item})
            setCarrito(arrayAuxiliar)
        }

        if (idCarrito == undefined) {
            fetch("http://localhost:8080/api/carrito", {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({item})})
                .then(res => res.json())
                .then(json => {
                    setIdCarrito(json.idCarrito)
                    console.log(json)
                })
                .catch(err => console.log(err))
        } else{
            fetch(`http://localhost:8080/api/carrito/${idCarrito}/productos`, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({item})})
        }
    }

    const removeItem = itemId => {
        arrayAuxiliar = carrito
        arrayAuxiliar.forEach((elemento, indice, array) => {
            if (elemento.item.id == itemId) {
                arrayAuxiliar.splice(indice,1)
            }
        })
        setCarrito(arrayAuxiliar)
    }

    const clearCart = async () => {
        setIdCarrito(undefined)
        setCarrito([])
        await fetch(`http://localhost:8080/api/carrito/${idCarrito}`, {
            method: "delete", 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({carrito})
        })
    }

    const isInCart = itemId => {
        if (carrito.find(elemento => elemento.item.id == itemId)) return true;
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
        setIdCarrito: setIdCarrito
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/productos")
            .then(res => res.json())
            .then(json => setProductos(json))
            .catch(err => console.log(err))
    },[])

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}

