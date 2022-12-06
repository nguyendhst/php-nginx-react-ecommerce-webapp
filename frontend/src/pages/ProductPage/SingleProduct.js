import React,{useState,state} from "react";
import { render } from "react-dom";
import {useLocation}from "react-router-dom";

class Democomponent extends React.Component {
    
    // Constructor 
    
    constructor(props) {
        super(props);
        
        this.state = {
            items: [],
            count: 1,
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
        
        const { DataisLoaded, items,count } = this.state;
            if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
        var a=2;
        return (
          // render logic here
          <div className="single-product-main">
             
         
          <div class="page-heading" id="top">
              <div class="container">
                  <div class="row">
                      <div class="col-lg-12">
                          <div class="inner-content">
                              <h2>Single Product Page</h2>
                              <span>Awesome &amp; Creative HTML CSS layout by therichpost</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          <section class="section" id="product">
              <div class="container">
                  <div class="row">
                      <div class="col-lg-8">
                      <div class="left-images">
                          <img src={items.image} alt="" />
                          {/* <img src="assets/images/single-product-02.jpg" alt="" /> */}
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="right-content">
                          <h4>{items.title}</h4>
                          <span class="price">${items.price}</span>
                          {/* <ul class="stars">
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                          </ul> */}
                          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor incididunt ut labore.</span>
                          <div class="quote">
                              <i class="fa fa-quote-left"></i><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod.</p>
                          </div>
                          <div class="quantity-content">
                              <div class="left-content">
                                  <h6>No. of Orders</h6>
                              </div>
                              <div class="right-content">
                                  <div class="quantity buttons_added">
                                      <input type="button" value="-" class="minus" onClick={()=>{this.setState({count:count+-1 })}}/><input type="number" step="1" min="1" max="" name="quantity" value={count} title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" /><input type="button"  value="+" class="plus" onClick={()=>{this.setState({count:count+1 })}} />
                                  </div>
                              </div>
                          </div>
                          <div class="total">
                              <h4>Total: ${items.price*count}</h4>
                              <div class="main-border-button"><a href="#">Add To Cart</a></div>
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
          </section>
          
        
      </div>
          // <a class = "col-12"  >
          //   <img class="image-product-single"  src={items.image} alt=""/>
          //   <div class="info-product-single">
          //   <div class="name-product-single">{items.title}</div>
          //   <div class="price-product">{items.price}</div>
          // </div> 
          
          // </a>
          
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