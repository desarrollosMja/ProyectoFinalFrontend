import { useParams } from "react-router"
import { useEffect, useState } from "react"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {

    const parametros = useParams()
    const [producto, setProducto] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${parametros.id}`)
            .then(res => res.json())
            /*Cuando vuelva a usar DB hay que eliminar el "[0]" porque lo que se recibe no es un array*/
            .then(json => setProducto(json[0]))
            .catch(err => console.log(err))
    },[parametros])

    return (
        <ItemDetail item={producto}/>
    )
}

export default ItemDetailContainer