import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "./ItemDetail.css"

const ItemDetail = (props) => {

    const {id, nombre, descripcion, codigo, urlFoto, precio, stock} = props.item

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
                <Button variant="dark">Agregar al carrito</Button>
            </Card.Body>
        </Card>
    )
}

export default ItemDetail