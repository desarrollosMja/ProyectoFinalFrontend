import { useParams } from "react-router"
import { useEffect, useState } from "react"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {

    const parametros = useParams()

    const [producto, setProducto] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/${parametros.id}`)
            .then(res => res.json())
            .then(json => setProducto(json[0]))
            .catch(err => console.log(err))
    },[parametros])

    return (
        <ItemDetail item={producto}/>
    )
}

export default ItemDetailContainer