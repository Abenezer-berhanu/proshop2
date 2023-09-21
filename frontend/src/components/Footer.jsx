import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import logo from "../assets/smuni.png";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const form = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_x8yhxjn", //service Id
        "template_zrk5srd", //template Id
        form.current,
        "IOqmX2uMifyTNV1g6" //public key
      )
      .then((data) => {
        toast.success("Thank you for your comment");
        setName("");
        setEmail("");
        setComment("");
      })
      .catch((err) => {
        toast.error(err?.text);
      });
  };
  const searchElectronics = () => {
    console.log(searchParams.get("q"));
  };
  return (
    <footer
      style={{ backgroundColor: "#F2F2F2", color: "black", paddingTop: "15px" }}
      className="footer-container"
    >
      <Container>
        <LinkContainer to="/">
          <>
            <Image src={logo} className="footer-image" roundedCircle />
            ስሙኒShop
          </>
        </LinkContainer>
        <Row style={{ color: "black" }}>
          <Col className="text-center py-3" md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light">
                <Link
                  to="mailto:abenuberhanu271@gmail.com"
                  className="d-flex align-items-center justify-content-center text-black gap-1"
                >
                  <AiFillMail /> Mail
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light">
                <Link
                  to="https://www.linkedin.com/in/abenezer-berhanu/"
                  className="d-flex align-items-center justify-content-center text-black gap-1"
                >
                  <FaLinkedin /> Linkedin
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light">
                <Link
                  to="/"
                  className="d-flex align-items-center justify-content-center text-black gap-1"
                >
                  <FaFacebook /> Facebook
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="text-center py-3" md={2}>
            <p>
              <strong>SHOP</strong>
            </p>
            <p>
              <Link
                to="/search/category/electronics"
                onClick={searchElectronics}
                style={{ color: "black" }}
              >
                Electronics
              </Link>
            </p>
            <p>
              <Link
                to="/search/category/accessory"
                onClick={searchElectronics}
                style={{ color: "black" }}
              >
                Accessory
              </Link>
            </p>
            <p>
              <Link
                to="/search/category/clothes"
                onClick={searchElectronics}
                style={{ color: "black" }}
              >
                Clothes
              </Link>
            </p>
          </Col>
          <Col className="text-center py-3" md={2}>
            <p>
              <strong>FAQ</strong>
            </p>
            <p>
              <Link to="/" style={{ color: "black" }}>
                Contact Us
              </Link>
            </p>
            <p>
              <Link to="/" style={{ color: "black" }}>
                Help
              </Link>
            </p>
            <p>
              <Link to="/" style={{ color: "black" }}>
                Testimonials
              </Link>
            </p>
            <p>
              <Link to="/" style={{ color: "black" }}>
                Privacy and Policy
              </Link>
            </p>
          </Col>
          <Col className="py-3" md={5}>
            <p>
              <big>We sell best products for cheap.</big>
            </p>
            <Form ref={form} onSubmit={handleSubmit}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="from_email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="from_name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Put Your Comment &#9759;</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Write comment ......"
                className="border border-success"
                name="message"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="outline-success" className="my-2" type="submit">
                Comment
              </Button>
            </Form>
            <p>
              <small>ስሙኒShop &copy; {currentYear}</small>
            </p>
          </Col>
        </Row>
        <div className="border border-dark"></div>
      </Container>
    </footer>
  );
}

export default Footer;
