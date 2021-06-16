import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToCartActions, removeFromCart } from '../redux/actions/cartActions';
import { Footer } from '../components/Footer';

export const CartView = (props) => {
  
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => dispatch(removeFromCart(id));

    const handleCheckout = () => props.history.push('/shipping');

    useEffect(() => {
     
    }, []);

    return (
        <>
          
            <Container className="cart">  
                <h2 className="title-spacing">Your Cart</h2> 
                <ul className="p-0">
                    {cartItems.length === 0 && <div>Your cart is empty</div>}
                    { cartItems.map(item => (
                        <li key={item.id} className="list-unstyled mb-2 border rounded px-2">
                            <div className="d-flex justify-content-between align-items-center text-center flex-wrap">
                                <div className="img-container">
                                    <img
                                        src={`/static${item.image}`} 
                                        alt={item.model}
                                        className="img-fluid cart-img"
                                    >
                                    </img>
                                </div>

                                <div className="name-container">
                                    <Link to={`/products/${item.id}`} className="font-weight-bold">{item.model}</Link>
                                </div>

                                <div className="ml-2">
                                    <span>{item.size}</span>
                                </div>

                                <div className="">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCartActions(item.id, Number(e.target.value), item.size))}
                                        className="rounded"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="">{item.price} Rwf</div>

                                <div className="">
                                    <Button type="button" variant="outline-secondary" onClick={() => removeFromCartHandler(item.id)} className="rounded" >
                                        Remove
                                    </Button>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul> 

                <div className="card border-0 mb-4">
                    <div className="mt-4 summary-price-box rounded">
                        <h4 className="subtotal mb-4">
                            Total of {cartItems.reduce((a, b) => a + Number(b.qty), 0)} items : {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} RWF
                        </h4>
                        <Button variant="secondary"  disabled={cartItems.length === 0} className="" onClick={handleCheckout}>Proceed to checkout</Button>
                    </div>
                </div>
            </Container>
            <Footer />

        </>
    )
}