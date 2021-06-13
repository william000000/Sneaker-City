import './App.css';
import '../node_modules/react-toastify/scss/main.scss';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import { ProductView } from './views/ProductsView';
import { NavWithRouter } from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { SingleProductView } from './views/SingleProduct';
import { CartView } from './views/Cart';
import { ShippingView } from './views/ShippingView';


function App() {
  return (
    <div className="App">
      <Router>
        <NavWithRouter />
        <Switch>
          <Route path='/products' exact component={ProductView} />
          <Route path='/products/:id?' component={SingleProductView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/shipping' component={ShippingView} />
        </Switch>

        <ToastContainer position="bottom-center"
          autoClose={9000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss 
          draggable
          pauseOnHover 
      />
      </Router>
    </div>
  );
}

export default App;
