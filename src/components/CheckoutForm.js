import React, { useState } from "react"
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from "react-stripe-elements"
import axios from "axios"

import { Container, Grid, Button, Typography, Link } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "0 0 5px #888888",
        margin: theme.spacing(4),
        padding: "4% 0%"
    },
    label: {
        fontSize: "1.2rem",
        width: "25%",
        margin: "2% auto"
    },
    receipt: {
        margin: "2% auto"
    },
    amount: {
        margin: "2% auto"
    },
    button: {
        margin: "4% auto",
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            margin: "2% auto",
            '& > *': {
                margin: theme.spacing(2),
            },
        },
        label: {
            width: "40%",
            margin: "2% auto"
        },
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            margin: "2% auto",
        },
    },
}))


const CheckoutForm = ({ selectedProduct, stripe, history }) => {
    const classes = useStyles()
    if (selectedProduct === null) history.push("/")

    const [receiptUrl, setReceiptUrl] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        const { token } = await stripe.createToken()

        const order = await axios.post("https://payment-processor-server.herokuapp.com/api/stripe/charge", {
            amount: selectedProduct.price.toString().replace(".", ""),
            source: token.id,
            receipt_email: "customer@example.com"
        })

        setReceiptUrl(order.data.charge.receipt_url)
    }

    if (receiptUrl) {
        return (
            <Container maxWidth="sm">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.root}
                >
                    <Typography className={classes.receipt} variant="h3">Payment Successful!</Typography>
                    <Link href={receiptUrl} className={classes.receipt} variant="h4">View Receipt</Link>
                    <Link href="/" className={classes.receipt} variant="h4">Home</Link>
                </Grid>
            </Container>
        )
    }

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Typography className={classes.amount} variant="h4">Amount: ${selectedProduct.price}</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.root}
                >
                    <Typography className={classes.label} variant="body1" component="label">
                        Card Details
                        <CardNumberElement />
                    </Typography>

                    <Typography className={classes.label} variant="body1" component="label">
                        Expiration Date
                        <CardExpiryElement />
                    </Typography>

                    <Typography className={classes.label} variant="body1" component="label">
                        CVC
                        <CardCVCElement />
                    </Typography>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        <CreditCardIcon /> Pay
                    </Button>
                </Grid>
            </form>
        </Container>
    )
}

export default injectStripe(CheckoutForm)