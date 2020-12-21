import React, { useState } from "react"
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import Products from "./components/Products"
import Checkout from "./components/Checkout"
import Header from "./components/Header"
import { products } from "./products"

import { CssBaseline, createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core"
import { pink, green } from '@material-ui/core/colors';

const history = createBrowserHistory()

let theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: pink[500],
    }
  },
})

theme = responsiveFontSizes(theme)

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Products
                products={products}
                selectProduct={setSelectedProduct}
                history={history}
              />
            )}
          />
          <Route
            path="/checkout"
            render={() => (
              <Checkout
                selectedProduct={selectedProduct}
                history={history}
              />
            )}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App