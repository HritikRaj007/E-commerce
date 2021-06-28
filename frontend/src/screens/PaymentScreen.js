import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import Popup from '../components/Popup';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress,paymentMethod } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [paymentVia, setPaymentMethod] = useState(paymentMethod)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if(paymentVia==='PayPal'){
      dispatch(savePaymentMethod(paymentVia))
      history.push('/placeorder')
    }else{
      togglePopup()
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      {isOpen && <Popup
      content={<>
         <p>SORRY! THIS SERVICE IS NOT AVAILABLE IN YOUR AREA.YOU CAN USE PAYPAL OR CREDIT CARD FOR PAYMENT</p>
      </>}
      handleClose={togglePopup}
    />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentVia==='PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
             <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentVia==='Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Cash on Delivery'
              id='COD'
              name='paymentMethod'
              value='CashOnDelivery'
              checked={paymentVia==='CashOnDelivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> 
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen