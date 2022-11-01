import { Link } from "react-router-dom";
function Header() {
    return (
     
        <header class="header-area header-sticky" style={{position:"sticky",top:"0"}}>
           <div class="container">
               <div class="row">
                   <div class="col-12">
                       <nav class="main-nav">
                        <Link class="logo" to={{ pathname: "/"}} onClick={()=>window.scrollTo(0, 0)}>
                            <img id="logo" itemprop="logo" src="https://e-learning.hcmut.edu.vn/pluginfile.php/1/core_admin/logocompact/300x300/1665455903/logoBK.png" alt="hcmut" class="img-responsive logoimg"/></Link>
                        
                           <ul class="nav">

                               <li class="submenu">
                                   <a href="javascript:;">Pages</a>
                                   <ul>
                                       <li><Link to={{ pathname: "/about"}}>About Us</Link></li>
                                       <li><Link to={{ pathname: "/products"}}>Products</Link></li>
                                       <li><Link to={{ pathname: "/single-product"}}>Single Product</Link></li>
                                       <li><Link to={{ pathname: "/contact-us"}}>Contact Us</Link></li>
                                   </ul>
                               </li>
                                
                               <li class="scroll-to-section"><a href="/Login">Login</a></li>
                           </ul>        
                           <a class='menu-trigger'>
                               <span>Menu</span>
                           </a>
                         
                       </nav>
                   </div>
               </div>
           </div>
       </header>
      
       
    );
}
export default Header;