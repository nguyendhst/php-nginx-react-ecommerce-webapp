import React,{useState,state} from "react";
import { render } from "react-dom";
import {useLocation}from "react-router-dom";

class Democomponent extends React.Component {
    
    // Constructor 
    
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {

        
        fetch(
  "https://fakestoreapi.com/products/"+this.props.value)  
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        
        const { DataisLoaded, items } = this.state;
            if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
 
        return (
          // render logic here
          <a class = "col-12"  >
            <img class="image-product-single"  src={items.image} alt=""/>
            <div class="info-product">
            <div class="name-product">{items.title}</div>
            <div class="price-product">{items.price}</div>
          </div> 
          </a>
          
        //   <Openprofile/>
        )
      }
  }
    const Openprofile = () =>{
            const location = useLocation()      
            return(
                <Democomponent
                value={location.state.id}/>
            )          
        }

//   const Viewprofilestates = () => {
//     const location = useLocation();
//     console.log(location);
//     return (
//         console.log(location.state),
//       <>
//         <div>viewstorage</div>
//         <div>user id:{location.state}</div>
        
//       </>
//     );
//   };

function SingleProduct() {
    // const { state } = this.props.location
        

    const location = useLocation();
    console.log(location);
    return (
      <>

        {/* <Democomponent/> */}
        <Openprofile/>
        
      </>
    );
   
}
export default SingleProduct;