import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCartActions } from '../redux/actions/cartActions';

export const Product = (props) => {
    const { product, className, isSpecificProd } = props;
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const handleAddToCart = (productId, qty, size) => {
        dispatch(addToCartActions(productId, qty, size));
    }
   
    return (
        <>
            <div className={className ? className : "bg-light product-container text-center"}>
                <div className="img-container">
                    <Link to={`/products/` + product.id} >
                        <img src={`/static${product.image}`} alt="product" />
                    </Link>
                </div>

                <div className="product-details d-flex justify-content-center flex-column">
                    <span className="text-black-50">Brand: <strong>{product.brandName}</strong></span>
                    <span className="text-black-50">Model: <strong>{product.model}</strong></span>
                    <span className="text-black-50">Price: <strong>{product.price} Frw</strong></span>
                    {isSpecificProd && <span className="text-black-50">In Stock: <strong>{product.countInStock}</strong></span>}
                    <span className="text-black-50">Release Date: <strong>{product.releaseDate}</strong></span>
                    {isSpecificProd && 
                        <>
                            <span>
                                <Form.Group controlId="size" >
                                    <Form.Label className="text-black-50 mr-4">Size: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2 rounded"
                                        custom
                                        onChange={(e) => setSize(e.target.value)}
                                        required={true}
                                        >
                                        <option>Select your size</option>
                                        {product && product.availableSizes.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </span>
                        
                            <span>
                                <Form.Group controlId="countInStock" >
                                    <Form.Label className="text-black-50">Qty: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="ml-2 rounded"
                                        custom
                                        onChange={(e) => setQty(e.target.value)}
                                        >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </span>

                            <div className="d-flex justify-content-center">
                                <Button onClick={() => handleAddToCart(product.id, qty, size)} className="add-to-cart-btn mt-1 w-100" >Add To Cart</Button>
                            </div>
                        </>
                    }
                
                
                   
                </div>
            </div>
    </> 
    )
}