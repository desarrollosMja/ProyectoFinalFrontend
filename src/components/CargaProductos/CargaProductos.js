import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./cargaProductos.css"
import { useContext } from "react"
import { myContext } from "../contexto/contexto"

const CargaProductos = () => {

    const contexto = useContext(myContext)

    const URL = `http://localhost:8080/api/productos`

    return (
        <Form method="post" action={URL}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre del producto" name="nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" placeholder="Descripción del producto" name="descripcion" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Código</Form.Label>
                <Form.Control type="number" placeholder="Código" name="codigo" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>URL Foto</Form.Label>
                <Form.Control type="text" placeholder="URL" name="urlFoto" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" placeholder="$" name="precio" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="Stock" name="stock" />
            </Form.Group>

            <Form.Check
                block
                defaultChecked
                label="Administrador"
                type="radio"
                name="administrador"
                value={contexto.administrador}
            />

            <Button variant="primary" type="submit">
                Cargar
            </Button>
        </Form>
    )
}

export default CargaProductos