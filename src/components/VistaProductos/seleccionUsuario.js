import "./seleccionUsuario.css"
import prefijos from "../../assets/json/prefijos-telefonicos.json"
import { useState, useContext, useRef, useEffect } from "react"
import { useHistory } from "react-router"
import { myContext } from "../contexto/contexto"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import pathParse from "path-parse"
import config from "../../config"

export default function SeleccionUsuario(){

    const [show, setShow] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertFoto, setShowAlertFoto] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullscreen, setFullscreen] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false)
    let inputEmail = useRef(null);
    let inputPass = useRef(null);
    let inputRegistroNombre = useRef(null);
    let inputRegistroEdad = useRef(null);
    let inputRegistroEmail = useRef(null);
    let inputRegistroPassword = useRef(null);
    let inputRegistroDireccion = useRef(null);
    let inputRegistroPrefijo = useRef(null);
    let inputRegistroTelefono = useRef(null);
    let inputRegistroFoto = useRef(null);
    let inputRegistroAdministrador = useRef(null);
    let inputRegistroCliente = useRef(null);

    let contexto = useContext(myContext)

    let history = useHistory()
    const token = sessionStorage.getItem("token")

    function login(e){
        e.preventDefault()
        setShowSpinner(true)
        fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: inputEmail.current.value, password: inputPass.current.value})
        })
            .then(res => res.json())
            .then(json => {
                if (json.token == null){
                    setShowAlert(true)
                    setShowSpinner(false)
                } else{
                    sessionStorage.setItem("token", `bearer ${json.token}`)
                    contexto.setUsuario(json.user.nombre)
                    contexto.setUserEmail(json.user.email)
                    contexto.setFileName(json.user.foto)
                    contexto.setUserPhone(`+${json.user.prefijo}${json.user.telefono}`)
                    if (json.user.administrador == false){
                        contexto.setAdministrador(false)
                    } else {
                        contexto.setAdministrador(true)
                    }
                    history.push(`/productos/${json.user._id}`)
                }
            })
            .catch(err => console.log(err))
    }

    function registro(e){
        e.preventDefault()
        setShowSpinner(true)
        const files = inputRegistroFoto.current.files
        const formData = new FormData()
        formData.append('foto', files[0])
        const tipoUsuario = inputRegistroAdministrador.current.checked ? "si" : "no"

        let path = pathParse(files[0].name);

        if(path.ext !== '.png' && path.ext !== '.jpg' && path.ext !== '.gif' && path.ext !== '.jpeg') {
            setShowAlertFoto(true)
        } else{
            fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/usuarios/guardar-foto`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .catch(err => console.log("Error en el front: ", err))

        fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/usuarios/nuevo`, {
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
                prefijo: inputRegistroPrefijo.current.value,
                telefono: inputRegistroTelefono.current.value,
                foto: files[0].name,
                tipoUsuario: tipoUsuario
            })
        })
            .then(res => res.json())
            .then(json => {
                sessionStorage.setItem("token", `bearer ${json.token}`)
                contexto.setUsuario(json.user.nombre)
                contexto.setUserEmail(json.user.email)
                contexto.setFileName(files[0].name)
                contexto.setUserPhone(`+${json.user.prefijo}${json.user.telefono}`)
                if (json.user.administrador == false){
                    contexto.setAdministrador(false)
                } else {
                    contexto.setAdministrador(true)
                }
                history.push("/productos")
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (token != undefined){
            fetch(`${config.PROTOCOL}://${config.BACK_URI}/api/usuarios/verify-token`, {
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.session == false) sessionStorage.removeItem("token")
                    if (json.session == true){
                        contexto.setUsuario(json.user.nombre)
                        contexto.setFileName(json.user.foto)
                    contexto.setAdministrador(json.user.administrador)
                        history.push(`/productos/${json.user.id}`)
                    }
                })
                .catch(err => console.log(err))
            }
    },[token])

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
                {showSpinner == true && <Spinner animation="grow" variant="dark" id="spinner"/>}
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
                                    <Form.Group className="mb-3" id="prefijo-telefonico-container">
                                        <Form.Select aria-label="Default select example" id="prefijo-telefonico-select" name="prefijo" ref={inputRegistroPrefijo}>
                                            {prefijos.map(elem => {
                                                return <option key={elem.iso3} value={elem.phone_code}>{elem.nombre} (+{elem.phone_code})</option>
                                            })}
                                        </Form.Select>
                                        <Form.Control id="prefijo-telefonico-input" name="telefono" placeholder="" type="number" ref={inputRegistroTelefono}/>
                                    </Form.Group>
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
        </Modal>
    )
}