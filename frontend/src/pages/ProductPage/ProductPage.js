// ProductPage is the page that displays the product details

import React,{useState} from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import{Link, useNavigate}from "react-router-dom";









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
"http://localhost:3003/api/products"+this.props.value)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }
  
  render() {
    
      
      
      
    const Openprofile = (id) =>{
          const navigate = useNavigate();
          navigate("/single-product",{
            state:{
              id:"1"
            }
          }
    
          )
        }
    
      
      const { DataisLoaded, items } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait some time.... </h1> </div> ;
 
      return (
        
      <a className = "product-item"  >
        <Link class="product-item-a"
        to="/single-product"
        state={{
          id:items.id
        }}>
          <img class="image-product"  src={items.image} alt=""/>
          <div class="info-product">
            <div class="name-product">{items.title}</div>
            <div class="price-product">{items.price}</div>
          </div>  

        </Link>
        
              
           

          
      </a>
  );
}
}








const ProductPage = () => {
  
    const [state,setState] = useState(Array.from({length:5}))
    const fetchMoreData = () => {
      if (state.length >= 35) {
        this.setState({ hasMore: false });
        return;
      }
        // a fake async api call like which sends   
        // 20 more records in 1.5 secs
        setTimeout(() => {
          setState(state.concat(Array.from({ length: 5 })))
        }, 1500);
      };
    return (
        <div className="products-main">
             
           
            <div class="page-heading" id="top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="inner-content">
                                <h2>Check Our Products</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteScroll class ="product-page"
          dataLength={state.length}
          next={fetchMoreData}
          hasMore={true}

          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {state.map((i, index) => (

            <div class="product-item-all"    key={index}>
              <Democomponent
              value={index+1} />
              {/* Item #{index} */}
            </div>
          ))}
          
        </InfiniteScroll>
            
            
        </div>
    );
};


export default ProductPage;