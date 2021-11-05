import { createContext, useState, useEffect } from "react";
export const tipoUsuario = createContext()
const { Provider } = tipoUsuario

export const TipoUsuarioProvider = ({ children }) => {
    const [administrador, setAdministrador] = useState(true)
    let [productos, setProductos] = useState([])

    const valorDelContexto = {
        administrador: administrador,
        setAdministrador: setAdministrador,
        productos: productos,
        setProductos: setProductos
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

