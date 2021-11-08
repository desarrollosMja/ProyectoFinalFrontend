import { useContext } from "react"
import ItemList from "./ItemList"
import { myContext } from "../contexto/contexto"

const ItemListContainer = () => {
    
    const contexto = useContext(myContext)

    return (
        <ItemList items={contexto.productos} />
    )
}

export default ItemListContainer