import { useContext } from "react"
import { myContext } from "../contexto/contexto"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "./ItemDetail.css"

const ItemDetail = (props) => {

    const {id, nombre, descripcion, codigo, urlFoto, precio, stock} = props.item

    const contexto = useContext(myContext)

    return (
        <Card>
            <Card.Header as="H1">{nombre}</Card.Header>
            <Card.Body>
                <Card.Img src={urlFoto} id="fotoDetail"></Card.Img>
                <Card.Title>$ {precio}</Card.Title>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                <Card.Subtitle>Stock: {stock}</Card.Subtitle>
                <Button variant="dark" onClick={() => contexto.addItem(props.item)}>Agregar al carrito</Button>
            </Card.Body>
        </Card>
    )
}

export default ItemDetail