import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 pb-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as={"div"} className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h6">
          <strong style={{ color: "black" }}>
            {product.price ? (
              `$${product.price}`
            ) : (
              <Card className="w-fit-content">show</Card>
            )}
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
