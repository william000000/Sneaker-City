import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartActions';

export const ShippingView = (props) => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [name, setName] = useState(shippingAddress.name || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '')

  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ name, address, city, phoneNumber }));
        props.history.push('/payments?price={}');
    };

    return (
      <>
        <Container className="">
          <Form onSubmit={submitHandler} className="form rounded px-4">
            <h2 className="text-center">Shipping</h2>
  
            <Form.Group className="mb-2" controlId="fullName" >
              <Form.Label className="">Full Name</Form.Label>
              <Form.Control type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required={true} />
            </Form.Group>
  
            <Form.Group className="mb-2" controlId="address" >
              <Form.Label className="">Address</Form.Label>
              <Form.Control type="text" placeholder="Your address" value={address} onChange={(e) => setAddress(e.target.value)} required={true} />
            </Form.Group>
  
            <Form.Group className="mb-2" controlId="city" >
              <Form.Label className="">City</Form.Label>
              <Form.Control type="text" placeholder="Your city" value={city} onChange={(e) => setCity(e.target.value)} required={true} />
            </Form.Group>
  
            <Form.Group className="mb-2" controlId="phoneNumber" >
              <Form.Label className="">Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required={true} />
            </Form.Group>
  
  
            <Button variant="secondary" size="sm" type="submit" className="font-weight-bold w-100">
              Continue
              </Button>

          </Form>
        </Container>
      </>
    );
  }
  