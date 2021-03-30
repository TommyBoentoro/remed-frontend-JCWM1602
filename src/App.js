import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import DataProduk from "./DataProduk"

export default class App extends React.Component{
  render(){
    return(
    //  <BrowserRouter>
    //   <Navbar/>
    //     <Switch>
    //       <Route exact path ="/" Component={DataProduk}/>
    //     </Switch>
    //  </BrowserRouter>
    <>
       <Navbar/>
       <DataProduk/>
    </>
   
   
    )
  }
}
