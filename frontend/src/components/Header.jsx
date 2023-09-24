import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userSliceApi";
import { clearCredentials } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";
export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message || error.error);
    }
  };

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#f2f2f2" }}
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ስሙኒShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav " />

          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />

            <Nav className="ms-auto">
              <Nav.Link>
                <strong>Phone</strong>
              </Nav.Link>
              <Nav.Link>
                <strong>Laptop</strong>
              </Nav.Link>
              {userInfo && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart size={20} />
                    {cartItems.length > 0 && (
                      <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                        {cartItems.length > 9
                          ? "9+"
                          : cartItems.length > 0
                          ? cartItems.length
                          : 0}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <NavDropdown title={`${userInfo.email}`} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
