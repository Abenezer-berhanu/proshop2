import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { toast } from "react-toastify";
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

import {
  useGetProductDetailQuery,
  useCreateReviewsMutation,
} from "../slices/productsSlice";
import Loader from "../components/Loader";
import { useState } from "react";

const ProductsScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewsMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product.product, qty }));
    navigate("/cart");
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        rating,
        comment,
        productId,
      }).unwrap();
      refetch();
      toast.success("Rating Posted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
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
          <Row className="review my-2">
            <Col md={7}>
              <h2>Reviews</h2>
              {product.product.reviews.length === 0 && (
                <Message variant={"info"}>No review</Message>
              )}
              <ListGroup variant="flush">
                {product.product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {reviewLoading && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={handleRatingSubmit}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value={"1"}>1 - Poor</option>
                          <option value={"2"}>2 - Fair</option>
                          <option value={"3"}>3 - Good</option>
                          <option value={"4"}>4 - Very Good</option>
                          <option value={"5"}>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={reviewLoading}
                        type="submit"
                        variant="primary"
                        className="sm"
                      >
                        Add Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Person who's not logged in can't review products{" "}
                      <Link to="/login">sign in</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductsScreen;
