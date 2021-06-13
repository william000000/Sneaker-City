import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../redux/actions/productAction';
import { Container } from 'react-bootstrap';
import { Product } from '../components/Product';


export const SingleProductView = (props) => {
    const prodRedirectId = props.match && props.match.params.id;
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        if(prodRedirectId) {
            dispatch(productListAction(prodRedirectId));
        }
    }, [dispatch, prodRedirectId]);

    return (
        <>
            <h2 className="title-spacing">Your Sneaker</h2>
            <Container className="d-flex justify-content-center mb-4">
                <Product product={products.length > 0 && products[0]} isSpecificProd={true} />   
            </Container>

        </>
    )
}