import React from "react"
import axios from "axios"

const linkAPI = "http://localhost:2000/products"
export default class DataProduk extends React.Component{

    state = {
        DataBarang: null,
        todaydate: null,
        idSelected: null,
        serialnumber : null
    }

    componentDidMount(){
        this.onGetData()
        this.GetDate()
        this.getSerial()
    }
    
    GetDate = () => {
        const d = new Date()
        const tanggal = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "T" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        console.log(tanggal)
        this.setState({todaydate: tanggal})
    }

    getSerial = () => {
        const serial = Date.now()
        
        this.setState({serialnumber: serial})
    }

    onGetData = () => {
        axios.get(linkAPI)
        .then((res)=>{
            console.log(res.data)
            this.setState({DataBarang: res.data})
        })
        .catch((err)=> {
            console.log(err)
        })
          
        }
    
    onSubmitProduk= () =>{
        let inputproduk = this.refs.inputproduk.value
        let inputstok = this.refs.inputstok.value
        let inputcategory = this.refs.inputcategory.value
        let inputprice = this.refs.inputprice.value
        let tanggal = this.state.todaydate
        let serialnumber = this.state.serialnumber

        if(inputstok === "0"){
            alert("stok tidak boleh 0")
        }else{
            if(inputcategory === "Electronic" || inputcategory === "Handphone" || inputcategory === "Furniture" || inputcategory === "Beauty" || inputcategory === "Fashion" || inputcategory === "Food & Drink"){
                if (inputproduk && inputstok && inputcategory && inputprice){
            
                    axios.post(linkAPI, {name: inputproduk, stock: inputstok, category: inputcategory, price: inputprice, status: "available", date: tanggal, serial: serialnumber })
                    .then((res)=>{
                        console.log(res)
                        if(res.status === 201){
                            alert ("Data berhasil ditambahkan")
                            this.onGetData()
                            window.location="/"
        
                            this.refs.inputproduk.value = ""
                            this.refs.inputstok.value = ""
                            this.refs.inputprice.value = ""
                            this.refs.inputprice.value = ""
                        }
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                    
                    
                }else{
                    alert ("Isi semua inputan")
                }
            }else {
                alert("List category yang boleh di input : Electronic, Handphone, Furnitur, Beauty, Fashion, Food & Drink")
            }
           
                
            
        }
       
        
    }

    onUpdateData = ()=> {
        let updatename= this.refs.editproduk.value
        let updateprice= this.refs.editharga.value
        let updatestok= this.refs.editstok.value

       if(updatename && updateprice && updatestok){
           axios.patch(linkAPI+ "/" + this.state.idSelected, {name : updatename, stock: updatestok, price: updateprice})
           .then((res)=>{
               console.log(res)
               if(res.status === 200){
                   alert ("Data berhasil diubah ")
                   this.onGetData()
                   this.setState({idSelected: null})
               }
           })
           .catch((err)=>{
               console.log(err)
           })
       }
    }

    onDeleteData = (idToDel) => {
        let confirm = window.confirm("Apakah anda ingin menghapus data ini? ")

        if(confirm === true){
            axios.patch(linkAPI + "/" + idToDel, {stock: 0, status: "Non-available"})
            .then((res)=>{
                console.log(res)
                if(res.status === 200){
                    alert("Data Berhasil dihapus")
                    this.onGetData()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    render(){
        if(this.state.DataBarang === null){
           return(
            <h1>
                Loading...
            </h1>
           )
           
        }else {
            return(
                <div className="mx-5">
                     <div>
                         <h1>
                             Data Barang
                         </h1>
                     </div>
        
                     <table className="table mt-5 ">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Nama Produk</th>
                            <th scope="col">SN</th>
                            <th scope="col">Stok</th>
                            <th scope="col">Harga</th>                       
                            <th scope="col">Action</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.DataBarang.map((value,index)=> {
                                    if(this.state.idSelected === value.id){
                                        return(
                                             <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>
                                                    <input type="text" ref="editdate" value={value.date}/>
                                                </td>
                                                <td>
                                                    <input type="text" ref="editproduk" defaultValue={value.name}/> 
                                                    </td>
                                                <td>
                                                    <input type="text" ref="editserial" value={value.serial}/> 
                                                </td>
                                                <td>
                                                    <input type="text" ref="editstok" defaultValue={value.stock}/> 
                                                </td>
                                                <td>
                                                    <input type="text" ref="editharga" defaultValue={value.price}/>
                                                </td>
                                               
                                                <td>
                                                    <input type="button" value="Submit" className="btn btn-success" onClick={this.onUpdateData} />
                                                    <input type="button" value= "Cancel" className="btn btn-danger ml-2" onClick={() => this.setState({idSelected : null})}/>
                                                </td>
                                             </tr>
                                        )
                                    }else {
                                        return(
                                           
                                            <tr key={index}>
                                               <th scope="row">{index+1}</th>
                                               <td>{value.date}</td>
                                               <td>{value.name} </td>
                                               <td>{value.serial} </td>
                                               <td>{value.stock} </td>
                                               <td>{value.price}</td>
                                               <td>
                                                   <input type="button" value="Edit" className="btn btn-warning" onClick={()=> this.setState({idSelected: value.id})} />
                                                   <input type="button" value= "Delete" className="btn btn-danger ml-2" onClick={()=> this.onDeleteData(value.id)}/>
                                               </td>
                                           </tr>
                                       )
                                    }
                                    
                                      
                                    
                                    
                                })
                            }

                             
                            
                            
                          
                        </tbody>
                        </table>

                    <br/>
                    <hr/>
                    <br/>

                    <div>
                        <h3>
                            Tambah Barang
                        </h3>
                        <div>
                            <input type="text" ref="inputproduk" placeholder="Masukan nama produk" className="form-control w-50"/>
                        </div>
                        <div>
                            <input type="text" ref="inputstok" placeholder="Masukan Stok" className="form-control w-50 mt-3"/>
                        </div>
                        <div>
                            <input type="text" ref="inputcategory" placeholder="Pilih Category"className="form-control w-50 mt-3"/>
                        </div>
                        <div>
                            <input type="text" ref="inputprice" placeholder= "Masukan Harga"className="form-control w-50 mt-3"/>
                        </div>
                        <div>
                            <input type="button" value="submit" className="btn btn-primary mt-3" onClick={this.onSubmitProduk}/>
                        </div>
                        
                    </div>
                </div>
        
                       
                    
                    

            
            )
        }

   
      

    }
}