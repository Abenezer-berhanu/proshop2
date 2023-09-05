import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ስሙኒShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
