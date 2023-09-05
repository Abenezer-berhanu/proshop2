import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import Message from "../components/Message";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";

import { useGetProductDetailQuery } from "../slices/productsSlice";
import Loader from "../components/Loader";
const ProductsScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <Image
                src={product.product.image}
                alt={product.product.name}
                fluid
              />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.product.rating}
                    text={`${product.product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>$:{product.product.price}</ListGroupItem>
                <ListGroupItem>{product.product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col className="text-center">Price:</Col>
                      <Col className="text-center">
                        <strong>${product.product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="text-center">Status:</Col>
                      <Col className="text-center">
                        <strong>
                          {product.product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductsScreen;
