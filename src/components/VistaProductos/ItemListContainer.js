import { useContext, useEffect } from "react"
import ItemList from "./ItemList"
import { myContext } from "../contexto/contexto"
import { useHistory, useParams } from "react-router"

const ItemListContainer = () => {
    const contexto = useContext(myContext)
    const history = useHistory()
    const params = useParams()
    const token = sessionStorage.getItem("token")

    if (params.userId != undefined) contexto.setUserId(params.userId)

    useEffect(() => {
        setInterval(() => {
            window.location.reload()
        }, 300000)

        fetch(`http://localhost:8080/api/usuarios/verify-token`, {
            headers: {
                authorization: token
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.session == false) history.push("/")
            if (json.session == true){
                contexto.setUsuario(json.user.nombre)
                contexto.setUserEmail(json.user.email)
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