import React from "react"
import { hot } from "react-hot-loader/root"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import TypeList from "./TypeList.js"
import 'regenerator-runtime/runtime'

import AnimalList from "./AnimalList.js"
// import SurrenderForm from "./SurrenderForm"
import "../public/style.css"

const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pets" />
        </Route>
        <Route exact path="/pets" component={TypeList} />
        {/* <Route exact path="/pets/new" component={SurrenderForm} /> */}
        <Route exact path="/pets/:type" component={AnimalList} />
        {/* <Route exact path="/pets/:type/:id" component={AnimalShow} /> */}
      </Switch>
    </BrowserRouter>
  )
}
export default hot(App)
