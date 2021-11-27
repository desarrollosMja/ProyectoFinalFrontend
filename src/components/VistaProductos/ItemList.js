import Item from "./Item"
import "./ItemList.css"

const ItemList = (props) => {

    let items = props.items

    return (
        <div id="contenedorItems">
            {items.map(item => <div key={item._id}><Item item={item} /></div>)}
        </div>
    )
}

export default ItemList