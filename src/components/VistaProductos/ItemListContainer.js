import { useContext } from "react"
import ItemList from "./ItemList"
import { tipoUsuario } from "../contexto/contexto"

const ItemListContainer = () => {
    
    const contexto = useContext(tipoUsuario)

    return (
        <ItemList items={contexto.productos} />
    )
}

export default ItemListContainer