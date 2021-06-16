import React, { useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { notificationSuccess } from '../helpers/toastNotificationPopUp';

export const PaymentView = (props) => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const frontEndRedirectUrl = 'http://localhost:3000/payments';
    const redirectedUrl = props.location.search && props.location.search.split('?')[1].split('&')[0].split('=')[1];

    useEffect(() => {
        if(redirectedUrl === 'successful') {
            return notificationSuccess('You have succcesfully paid your sneak! Thank you..')
        }
    }, [redirectedUrl])
    
    return (
        <Container className="payment-container rounded">
            { redirectedUrl === 'successful' ? <strong className="text-success">Thank you to buy from us! Your sneaker will reach you in a minutes.</strong>: 
                <>
                    <h2 className="my-4">Pay Your Order</h2>

                    <h4 className="subtotal mb-4">
                            The total of {cartItems.reduce((a, b) => a + Number(b.qty), 0)} items : {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} RWF
                    </h4>
                    <p>Click the button below to pay</p>

                    <Form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
                        <input type="hidden" name="public_key" value="FLWPUBK_TEST-SANDBOXDEMOKEY-X" />
                        <input type="hidden" name="customer[email]" value="adzebobo@gmail.com" />
                        <input type="hidden" name="customer[phone_number]" value="0788761467" />
                        <input type="hidden" name="customer[name]" value="Willy" />
                        <input type="hidden" name="tx_ref" value="bitethtx-019203" />
                        <input type="hidden" name="amount" value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)} />
                        <input type="hidden" name="currency" value="RWF" />
                        <input type="hidden" name="payment_options" value="card,mobilemoney,ussd" />
                        <input type="hidden" name="meta[token]" value="54" />
                        <input type="hidden" name="redirect_url" value={frontEndRedirectUrl} />
                        
                        <Button type="submit" variant="success">Pay Now</Button> 
                    </Form>
                </>
            }
        </Container>
      )
}