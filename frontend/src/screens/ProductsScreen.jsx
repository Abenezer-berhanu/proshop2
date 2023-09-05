import { useParams, Link } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
const ProductsScreen = () => {
  const { id } = useParams();
  const product = products.find(p => p._id === id);
  return (
    <div>
      <Link className="btn btn-light my-3">Go Back</Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>$:{product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col className="text-center">Price:</Col>
                  <Col className="text-center"><strong>${product.price}</strong></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col className="text-center">Status:</Col>
                  <Col className="text-center">
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsScreen;
