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
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          
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
