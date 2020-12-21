import React from "react"

import { Container, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "0 0 5px #888888",
        margin: theme.spacing(4),
        '& > *': {
            margin: theme.spacing(3),
        },
    },
    desc: {
        width: "50%",
        fontSize: "1.3rem"
    },
    prodImg: {
        borderRadius: "10%",
        width: "400px",
        height: "400px",
    },
    [theme.breakpoints.down('xs')]: {
        prodImg: {
            borderRadius: "10%",
            width: "200px",
            height: "200px",
        },
        root: {
            margin: "2% auto",
            '& > *': {
                margin: theme.spacing(2),
            },
        },
        desc: {
            width: "75%",
        },
      },
      [theme.breakpoints.down('sm')]: {
        root: {
            margin: "2% auto",
        },
      },
}));

const Products = ({ products, selectProduct, history }) => {
    const classes = useStyles()

    const handlePurchase = prod => () => {
        selectProduct(prod)
        history.push("/checkout")
    }

    return products.map(prod => (
        <Container maxWidth="md"
            key={prod.id}>
            <Grid
                className={classes.root}
                container
                direction="column"
                alignItems="center"
                justify="center"
                >
                <Typography variant="h3" gutterBottom>{prod.name}</Typography>
                <img className={classes.prodImg} src={prod.img} alt={prod.name} />
                <Typography className={classes.desc} variant="body1">{prod.desc}</Typography>
                <Typography variant="h4" gutterBottom>{"Price: $" + prod.price}</Typography>
                <Button variant="contained" color="primary" size="large" onClick={handlePurchase(prod)}>
                   <AddShoppingCartIcon /> Purchase
                </Button>
            </Grid>
        </Container>
    ))
}

export default Products