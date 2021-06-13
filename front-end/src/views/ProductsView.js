import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction, sortProductsAction } from '../redux/actions/productAction';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { Product } from '../components/Product';
import Spinner from '../components/Spinner';
import Pagination from "react-js-pagination";

export const ProductView = () => {

    const productList = useSelector(state => state.productList);
    const { loading, products } = productList;

    const dispatch = useDispatch();


    const productsPerPage = 10;
    const [activePage, setCurrentPage] = useState(1);

    // Logic for displaying current products
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleSort = (orderBy) => dispatch(sortProductsAction(orderBy));


    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    return loading ? <Spinner /> :
        <>
            <h2 className="title-spacing">Welcome to Best Sneaker Shop</h2>
            <Form.Control
                as="select"
                className="my-4"
                custom
                onChange={(e) => handleSort(e.target.value)}
                >
                <option>Sort By</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                
            </Form.Control>

            <Container className="">
                <Row className="gutter d-flex justify-content-center">
                    {currentProducts.map(product => (
                        <Col className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                            <Product product={product} />
                        </Col>
                    ))}

                    <div className="pagination-container w-100 d-flex justify-content-center">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={productsPerPage}
                            totalItemsCount={products.length}
                            pageRangeDisplayed={2}
                            onChange={handlePageChange}
                        />
                    </div>

                </Row>
            </Container>

        </>
}