import React,{useState} from "react";
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
 'https://fakestoreapi.com/products/'+this.props.value)
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
				 <div class="price-product">${items.price}</div>
			  </div>  
 
			</Link>
			
					
				
 
			  
		 </a>
	);
 }
 }






function Home() {
	const [state,setState] = useState(Array.from({length:3}))
    const fetchMoreData = () => {
      if (state.length >= 35) {
        this.setState({ hasMore: false });
        return;
      }
        // a fake async api call like which sends   
        // 20 more records in 1.5 secs
        setTimeout(() => {
          setState(state.concat(Array.from({ length: 3 })))
        }, 1500);
      };
   return (<>
   <div id="home-slider">
	 <div class="owl-carousel owl-theme owl-nav-style-1 dark owl-loaded owl-drag" data-lg-items="1" data-md-items="1" data-sm-items="1" data-xs-items="1" data-dot="false" data-nav="true" data-margin="0">
            <div class="image">
				<picture>
					<img src="//theme.hstatic.net/200000384841/1000740278/14/home_slider_image_1.jpg?v=1109" alt=""/>
				</picture>
			</div>
            <div class="content">
				<h3>Giải pháp sạc nhanh</h3>
				<p>Sợi Kevlar | 1,8m | 20W</p>
				<a class="btn" href="">Shop Now </a>

			</div>
     </div>
     
     	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	</div>


   
   
    <section class="home-category">
    <div class="container">
		<div class="home-category__wrap">
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/charge">
                    
					<img src="assets/images/home_category_image_1.png" loading="lazy" alt="category"/>
					
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/charge">
					Charger
				</a>
			</div>
			
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/TWS">
					<img src="assets/images/home_category_image_2.png" loading="lazy" alt="category"/>
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/TWS">
					TWS
				</a>
			</div>
			
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/Cable">
                <img src="assets/images/home_category_image_3.png" loading="lazy" alt="category"/>
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/Cable">
					Cable
				</a>
			</div>
			
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/PowerBlank">
                <img src="assets/images/home_category_image_4.png" loading="lazy" alt="category"/>
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/PowerBlank">
					Power Bank
				</a>
			</div>
			
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/LifeStyle">
                <img src="assets/images/home_category_image_5.png" loading="lazy" alt="category"/>
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/LifeStyle">
					Life Style
				</a>
			</div>
			
			
			
			
			
			
			
			
			
			<div class="home-category__item">
				<a class="home-category__image" href="/Other">
                <img src="assets/images/home_category_image_6.png" loading="lazy" alt="category"/>
					<span class="home-category__tag"></span>
				</a>
				<a class="home-category__title" href="/Other">
					More
				</a>
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
    </section>
    </>
   )
}
export default Home;