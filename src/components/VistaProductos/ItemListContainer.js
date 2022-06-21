import { useContext, useEffect } from "react"
import ItemList from "./ItemList"
import { myContext } from "../contexto/contexto"
import { useHistory } from "react-router"

const ItemListContainer = () => {
    const contexto = useContext(myContext)
    const history = useHistory()
    const token = sessionStorage.getItem("token")

    useEffect(() => {
        setInterval(() => {
            window.location.reload()
        }, 60000)

        fetch(`http://localhost:8080/api/usuarios/verify-token`, {
            headers: {
                authorization: token
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json.session == false) history.push("/")
            if (json.session == true){
                contexto.setUsuario(json.user.nombre)
                contexto.setFileName(json.user.foto)
                contexto.setAdministrador(json.user.administrador)
            }
        })
        .catch(err => console.log(err))
    },[token])

    return (
        <ItemList items={contexto.productos} />
    )
}

export default ItemListContainer