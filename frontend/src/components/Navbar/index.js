import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import "./index.css";
// function Header() {
//     return (

//         <header class="header-area header-sticky" style={{position:"sticky",top:"0"}}>
//            <div class="container">
//                <div class="row">
//                    <div class="col-12">
//                        <nav class="main-nav">
//                         <Link class="logo" to={{ pathname: "/"}} onClick={()=>window.scrollTo(0, 0)}>
//                             <img id="logo" itemprop="logo" src="https://e-learning.hcmut.edu.vn/pluginfile.php/1/core_admin/logocompact/300x300/1665455903/logoBK.png" alt="hcmut" class="img-responsive logoimg"/></Link>

//                            <ul class="nav">

//                                <li class="submenu">
//                                    <a href="javascript:;">Pages</a>
//                                    <ul>
//                                        <li><Link to={{ pathname: "/about"}}>About Us</Link></li>
//                                        <li><Link to={{ pathname: "/products"}}>Products</Link></li>
//                                        <li><Link to={{ pathname: "/single-product"}}>Single Product</Link></li>
//                                        <li><Link to={{ pathname: "/contact-us"}}>Contact Us</Link></li>
//                                    </ul>
//                                </li>

//                                <li class="scroll-to-section"><a href="/Login">Login</a></li>
//                            </ul>
//                            <a class='menu-trigger'>
//                                <span>Menu</span>
//                            </a>

//                        </nav>
//                    </div>
//                </div>
//            </div>
//        </header>

//     );
// }

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bgcolor" variant="dark" >
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          
        </Nav>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};
export default Header;
