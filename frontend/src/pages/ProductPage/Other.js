// ProductPage is the page that displays the product details

import React,{useState} from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Other = () => {
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
             
           
      <div class="banner-collection-header mb-30">
        <div class="container">
          <h1 class="title">
          Dây cáp
          </h1>
        </div>

        <img src="//theme.hstatic.net/200000384841/1000740278/14/collection_banner.jpg?v=1109" alt="CỦ SẠC"/>

      </div>
            <InfiniteScroll
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
            <div class="product-item" key={index}>
              Item #{index}
            </div>
          ))}
        </InfiniteScroll>
            
            
        </div>
    );
};


export default Other;