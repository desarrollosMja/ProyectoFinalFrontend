import { useState, useContext } from "react"
import { useHistory } from "react-router"
import { tipoUsuario } from "../contexto/contexto"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function SeleccionUsuario(){

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let contextoAdministrador = useContext(tipoUsuario)

    let history = useHistory()

    function guardarUsuario(){
        const radios = document.getElementsByName("tipoUsuario")
        for (const radio of radios) {
            if (radio.checked && radio.value == "si") {
                contextoAdministrador.setAdministrador(true)
            }
            if (radio.checked && radio.value == "no") {
                contextoAdministrador.setAdministrador(false)
            }
        }
        handleClose()

        history.push("/productos")
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header>
                <Modal.Title>¿Usuario administrador?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="radio" label="SI" name="tipoUsuario" id="radioSI" value="si" defaultChecked/>
                        <Form.Check type="radio" label="NO" name="tipoUsuario" id="radioNO" value="no"/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={() => guardarUsuario()}>Continuar</Button>
            </Modal.Footer>
        </Modal>
    )
}