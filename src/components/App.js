import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Header/NavBar"
import ItemListContainer from './VistaProductos/ItemListContainer';
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer"
import CargaProductos from "./CargaProductos/CargaProductos"
import Carrito from "./Carrito/Carrito"
import SeleccionUsuario from "./VistaProductos/seleccionUsuario"
import { MyContextProvider } from "./contexto/contexto"

const App = () => {

    return (
        <BrowserRouter>
            <MyContextProvider>
                <NavBar/>
                <Switch>
                    <Route path="/" component={SeleccionUsuario} exact/>
                    <Route path="/productos" component={ItemListContainer} />
                    <Route path="/producto/:id" component={ItemDetailContainer} />
                    <Route path="/nuevo-producto" component={CargaProductos} />
                    <Route path="/carrito" component={Carrito} />
                </Switch>
            </MyContextProvider>
        </BrowserRouter>
    )
}

export default App