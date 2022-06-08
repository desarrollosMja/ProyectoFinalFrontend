import { useContext, useEffect } from "react"
import ItemList from "./ItemList"
import { myContext } from "../contexto/contexto"
import { useHistory } from "react-router"
import axios from "axios"

const ItemListContainer = () => {
    const contexto = useContext(myContext)
    const history = useHistory()
    const email = sessionStorage.getItem("user")

    useEffect(() => {
        fetch(`http://localhost:8080/api/usuarios/check-session/${email}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            //if (json.session == false) history.push("/")
        })
        .catch(err => console.log(err))
    },[email])

    return (
        <ItemList items={contexto.productos} />
    )
}

export default ItemListContainer