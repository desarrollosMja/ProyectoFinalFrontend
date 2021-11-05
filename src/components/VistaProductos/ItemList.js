import Item from "./Item"
import "./ItemList.css"

const ItemList = (props) => {

    let {items} = props

    return (
        <div id="contenedorItems">
            {items.map(item => <div key={item.id}><Item item={item} /></div>)}
        </div>
    )
}

export default ItemList