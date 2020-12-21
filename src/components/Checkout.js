import React, { useEffect } from "react"
import { StripeProvider, Elements } from "react-stripe-elements"
import CheckoutForm from "./CheckoutForm"

const Checkout = ({ selectedProduct, history }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <StripeProvider apiKey="pk_test_51Hz4LbEReIBUKZpkK6U6HfEol0e7ZwODQh7Ftwqsg6uQynoxEMV9R1BZuCV2kq3jJfQdUl1okKXADnMuUnPSi4XA00UV1a8JM2">
            <Elements>
                <CheckoutForm selectedProduct={selectedProduct} history={history} />
            </Elements>
        </StripeProvider>
    )
}

export default Checkout