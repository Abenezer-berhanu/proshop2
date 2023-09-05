import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      const getProducts = async () => {
      const res = await axios(`/api/product`);
      setProducts(res.data.products);
    };
    getProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
