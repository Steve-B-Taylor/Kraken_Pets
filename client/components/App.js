import React from "react"
import { hot } from "react-hot-loader/root"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import TypeList from "./TypeList"
// import AnimalList from "./AnimalList"
// import SurrenderForm from "./SurrenderForm"
import "../public/stlye.css"
const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pets" component={TypeList} />
        {/* <Route exact path="/pets/new" component={SurrenderForm} /> */}
        <Route exact path="/pets/:type" component={AnimalList} />
        {/* <Route exact path="/pets/:type/:id" component={AnimalShow} /> */}
      </Switch>
    </BrowserRouter>
  )
}
export default hot(App)
