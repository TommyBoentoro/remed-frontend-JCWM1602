import axios from "axios"
import React, { useDebugValue } from "react"
import Dataproduk from "./DataProduk"

const linkAPI = "http://localhost:2000/products"

export default class Navbar extends React.Component{

    state = {
        TotalStock : null
    }

    componentDidMount(){
        this.onGetTotalStok()
    }

    onGetTotalStok = () => {
        axios.get(linkAPI)
        .then((res)=>{
            console.log(res.data.length)
            this.setState({TotalStock: res.data.length})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            
            <nav className="navbar navbar-light bg-light container">
              <span className="navbar-brand mb-0 h1">Navbar</span>
              <div>
                Total stock: 
                {
                    this.state.TotalStock
                }
              </div>
            </nav>
        )
    }
}