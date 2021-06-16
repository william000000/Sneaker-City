import React, { useEffect, useState } from 'react';
import {
  Nav, Navbar, Container, Form, InputGroup
} from 'react-bootstrap';
import logo from '../assets/sneaker_logo.jpeg';
import { withRouter, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { productListAction } from '../redux/actions/productAction';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {

  const [searchQuery, setSearchQuery] = useState({})
  const [isSelected, setIsSelected] = useState(false);

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const handleOnSearch = (string, results) => setIsSelected(false);

  const handleOnHover = (result) => { }

  const handleOnSelect = (item) => {
    setSearchQuery(item.id)
    setIsSelected(true);
  }

  const handleOnFocus = () => { }

  useEffect(() => {
    if(!products) {
      dispatch(productListAction())
    }
  }, [dispatch, products])

  return (
    <>
        {isSelected && <Redirect to={`/products/${searchQuery}`} />}

          <Navbar collapseOnSelect expand="lg" variant="light" className="main-nav bg-white" >
            <Container className="nav-container d-flex align-items-center">
              <Navbar.Brand href="/products">
                <img src={logo} className="d-inline-block align-top logo" alt="logo" />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="searchNavContainer">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
              </Navbar.Toggle>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Navbar.Collapse className="responsive-navbar-nav">

                <Nav className="mx-auto nav-style" activekey="/">

                  <Nav.Link eventkey="/" className="mr-2 navlink" href="/products">Home</Nav.Link>
                  <Nav.Link eventkey="shop" className="mr-2 navlink" href="/products">Products</Nav.Link>

                </Nav>

                <Form inline className="my-sm-3 my-lg-0 search-form">
                  <InputGroup className="d-flex align-items-center flex-nowrap">

                    { products &&
                      <div className="search-container">
                        <ReactSearchAutocomplete
                          items={products.map(item => item)}
                          onSearch={handleOnSearch}
                          onHover={handleOnHover}
                          onSelect={handleOnSelect}
                          onFocus={handleOnFocus}
                          showIcon={false}
                          placeholder="Type to search for a sneaker"
                          autoFocus
                          className="pl-4 searchInputField"
                          fuseOptions={{ keys: ["brandName"] }}
                          resultStringKeyName="brandName"
                        />
                      </div>}

                  </InputGroup>
                </Form>

                <div className="mr-4 cart-nav-icon-container">
                  <Link to={'/cart'}>
                    <FontAwesomeIcon icon={faCartPlus} className="font-icon" />
                    <span className="counter">{cartItems.length > 0 && cartItems.reduce((a, b) => a + Number(b.qty), 0)}</span>
                  </Link>
                </div>

              </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  )
}

export const NavWithRouter = withRouter(NavigationBar);
