import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import defaultProduct from '../static/products/sneaker_3.jpeg'

export const Product = (props) => {
    const { product } = props;
    
    const handleAddToCart = () => {

    }
   
    return (
        <>
            <div className="bg-light product-container text-center">
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
                    <div className="d-flex justify-content-center">
                        <Button onClick={() => handleAddToCart(product.id)} className="add-to-cart-btn mt-1" >Add To Cart</Button>
                    </div>
                   
                </div>
            </div>
    </> 
    )
}