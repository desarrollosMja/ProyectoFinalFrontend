import { useState, useContext, useRef } from "react"
import { useHistory } from "react-router"
import { myContext } from "../contexto/contexto"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Alert from "react-bootstrap/Alert"
import pathParse from "path-parse"

export default function SeleccionUsuario(){
    
    const [show, setShow] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertFoto, setShowAlertFoto] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullscreen, setFullscreen] = useState(true);
    let inputEmail = useRef(null);
    let inputPass = useRef(null);
    let inputRegistroNombre = useRef(null);
    let inputRegistroEdad = useRef(null);
    let inputRegistroEmail = useRef(null);
    let inputRegistroPassword = useRef(null);
    let inputRegistroDireccion = useRef(null);
    let inputRegistroTelefono = useRef(null);
    let inputRegistroFoto = useRef(null);
    let inputRegistroAdministrador = useRef(null);
    let inputRegistroCliente = useRef(null);

    let contextoAdministrador = useContext(myContext)
    let contextoUsuario = useContext(myContext)
    let contextoFileName = useContext(myContext)

    let history = useHistory()

    function login(e){
        e.preventDefault()
        fetch("http://localhost:8080/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: inputEmail.current.value, password: inputPass.current.value})
        })
            .then(res => res.json())
            .then(json => {
                if (json == null){
                    setShowAlert(true)
                } else{
                    contextoUsuario.setUsuario(json.nombre)
                    contextoFileName.setFileName(json.foto)
                    if (json.administrador == false){
                        contextoAdministrador.setAdministrador(false)
                    } else {
                        contextoAdministrador.setAdministrador(true)
                    }
                    history.push("/productos")
                }
            })
            .catch(err => console.log(err))
    }

    function registro(e){
        e.preventDefault()
        const files = inputRegistroFoto.current.files
        const formData = new FormData()
        formData.append('foto', files[0])
        const tipoUsuario = inputRegistroAdministrador.current.checked ? "si" : "no"

        let path = pathParse(files[0].name);
        let fileName = pathParse.base
        if(path.ext !== '.png' && path.ext !== '.jpg' && path.ext !== '.gif' && path.ext !== '.jpeg') {
            setShowAlertFoto(true)
        } else{
            fetch("http://localhost:8080/api/usuarios/guardar-foto", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .catch(err => console.log("Error en el front: ", err))

        fetch("http://localhost:8080/api/usuarios/nuevo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: inputRegistroNombre.current.value,
                edad: inputRegistroEdad.current.value,
                email: inputRegistroEmail.current.value,
                password: inputRegistroPassword.current.value,
                direccion: inputRegistroDireccion.current.value,
                telefono: inputRegistroTelefono.current.value,
                foto: fileName,
                tipoUsuario: tipoUsuario
            })
        })
            .then(res => res.json())
            .then(json => {
                contextoUsuario.setUsuario(json.nombre)
                contextoFileName.setFileName(fileName)
                if (json.administrador == false){
                    contextoAdministrador.setAdministrador(false)
                } else {
                    contextoAdministrador.setAdministrador(true)
                }
                history.push("/productos")
            })
            .catch(err => console.log(err))
        }

    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            fullscreen={fullscreen}
        >
            <Modal.Header>
                <Modal.Title id="modalTitle">¡BIENVENIDO!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col xs={4} id="divLogin" className="bordeSoft m-2 p-4">
                            <h2 className="centrado mb-2">¿Estas registrado/a?</h2>
                            <Form id="formularioLogin">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Alert variant="danger" show={showAlert}>
                                        Usuario y/o contraseña incorrecto/s
                                    </Alert>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Ingrese su email" ref={inputEmail}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" ref={inputPass}/>
                                </Form.Group>

                                <Button variant="success" type="submit" onClick={e => login(e)}>
                                    Ingresar
                                </Button>
                            </Form>
                        </Col>

                        <Col id="divRegistro" className="bordeSoft m-2 p-4">
                            <h2 className="centrado mb-2">¡Registrate gratis!</h2>
                            <Form id="formularioRegistro" >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" name="nombre" placeholder="Nombre" ref={inputRegistroNombre}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridAge">
                                        <Form.Label>Edad</Form.Label>
                                        <Form.Control type="number" name="edad" placeholder="Edad" ref={inputRegistroEdad}/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Ingrese su email"ref={inputRegistroEmail} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" ref={inputRegistroPassword}/>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text" name="direccion" placeholder="Av. San Martín...." ref={inputRegistroDireccion}/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formGridPhone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control name="telefono" placeholder="+5411...." type="number" ref={inputRegistroTelefono}/>
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Foto<span className="fst-italic fw-lighter fs-6"> (JPG, JPEG, GIF o PNG)</span></Form.Label>
                                    <Form.Control name="foto" type="file" id="inputFile" ref={inputRegistroFoto}/>
                                    <Alert className="mt-3" variant="danger" show={showAlertFoto} id="alertFoto">
                                        Sólo se admiten las siguientes extensiones: .jpg, .jpeg, .png o .gif
                                    </Alert>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check inline type="radio" label="Administrador" name="tipoUsuario" id="radioSI" value="administrador" defaultChecked ref={inputRegistroAdministrador}/>
                                        <Form.Check inline type="radio" label="Cliente" name="tipoUsuario" id="radioNO" value="cliente"ref={inputRegistroCliente}/>
                                </Form.Group>

                                <Button variant="success" type="submit" onClick={e => registro(e)}>
                                    Guardar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

            {/* <Modal.Footer>
                <Button variant="primary" onClick={() => guardarUsuario()}>Continuar</Button>
            </Modal.Footer> */}
        </Modal>
    )
}