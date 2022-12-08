import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import "./index.css";
import AuthServices from "../../services/auth.service";


function logout() {
  AuthServices.logout();
  window.location.href = "/";
}

const Header = () => {
  // check if user is logged in
  const user = AuthServices.getCurrentUser();

  return (
    <Navbar collapseOnSelect expand="lg" className="bgcolor" variant="dark" >
    <Container>
      <Navbar.Brand href="/">BTL</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/*  dropdown */}
          <NavDropdown title="Products" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/products/charger">Charger</NavDropdown.Item>
            <NavDropdown.Item href="/products/tws">TWS</NavDropdown.Item>
            <NavDropdown.Item href="/products/cable">Cable</NavDropdown.Item>
            <NavDropdown.Item href="/products/powerbank">Powerbank</NavDropdown.Item>
            <NavDropdown.Item href="/products/lifestyle">Lifestyle</NavDropdown.Item>
          </NavDropdown>

    
          
        </Nav>
        <Nav>
          {user ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/users/login">Login</Nav.Link>
          )}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};
export default Header;
