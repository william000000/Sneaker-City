import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import defaultProduct from '../static/products/sneaker_3.jpeg'

export const Product = (props) => {
    const { product, className, isSpecificProd } = props;
    const [size, setSize] = useState('');
    const handleAddToCart = () => {

    }
   
    return (
        <>
            <div className={className ? className : "bg-light product-container text-center"}>
                <div className="img-container">
                    <Link to={`/products/` + product.id} >
                        <img src={product.image || defaultProduct} alt="product" />
                    </Link>
                </div>

                <div className="product-details d-flex justify-content-center flex-column">
                    <span className="text-black">Brand: {product.brandName}</span>
                    <span className="text-black">Model: {product.model}</span>
                    <span className="text-black">Price: {product.price} rwf</span>
                    <span className="text-black">In Stock: {product.countInStock}</span>
                    <span className="text-black">Release Date: {product.releaseDate}</span>
                    {isSpecificProd && 
                        <>
                            <span>
                                <Form.Group controlId="size" >
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        onChange={(e) => setSize(e.target.value)}
                                        >
                                        <option value="all">Select your size</option>
                                        {product && product.availableSizes.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </span>
                        
                            <span>
                                <Form.Group controlId="countInStock" >
                                    <Form.Label>Qty: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        onChange={(e) => setSize(e.target.value)}
                                        >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </span>
                        </>
                    }
                
                    <div className="d-flex justify-content-center">
                        <Button onClick={() => handleAddToCart(product.id)} className="add-to-cart-btn mt-1" >Add To Cart</Button>
                    </div>
                   
                </div>
            </div>
    </> 
    )
}