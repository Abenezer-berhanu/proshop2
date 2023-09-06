import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";

import { useGetProductDetailQuery } from "../slices/productsSlice";
import Loader from "../components/Loader";
import { useState } from "react";

const ProductsScreen = () => {
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product.product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
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
                  {product.product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col className="text-center">Amount</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                            }}
                          >
                            {[
                              ...Array(product.product.countInStock).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.product.countInStock === 0}
                      onClick={handleAddToCart}
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
