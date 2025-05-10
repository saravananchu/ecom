import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Create(){
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const [description,setDescription]=useState()
    const [details,setDetails]=useState()
    const [image,setImage]=useState([0])
const navigate=useNavigate()

    const submit=(e)=>{
        e.preventDefault()
        


        const formdata=new FormData()
        formdata.append('name',name)

formdata.append('price',price)

formdata.append('description',description)

        formdata.append('details',details)
        formdata.append('image',image)
        axios 
        .post('http://localhost:3001/create',formdata,{
            headers: {
                "Content-Type": "multipart/form-data", // Ensure correct content type
              },
        })
        
              .then(result=>{console.log(result)
                navigate('/')
              })
            .catch(err=>console.log('error',err))
        
    }
    return(
        <>

       <div className="container mt-5 lo re">
        <div className="card card-lo">
            <h2>Register</h2>
            <form onSubmit={submit}>
                <div className="input-container">
                <label>Product Name</label>
                <input type="text"  onChange={(e)=> setName(e.target.value)}></input>
                     </div>

                <div className="input-container">
                <label>Product Price</label>
                <input type="number"  onChange={(e)=> setPrice(e.target.value)}></input>
                </div>
                <div className="input-container">
                <label>Product Description</label>
                <input type="text"  onChange={(e)=> setDescription(e.target.value)}></input>
                </div>

                <div className="input-container">
                <label>Product Details</label>
            <input type="text"  onChange={(e)=> setDetails(e.target.value)}></input>
                </div>

                <div className="input-container">
                    <label for="password">Image:</label>
              
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>

                <button type="submit" className="btn">Register</button>

                <div className="footers">
                    <p>go to<br/> <a href="/">Home</a></p>
                </div>
            </form>
        </div>
    </div>
        
        </>
    )
}

export default Create