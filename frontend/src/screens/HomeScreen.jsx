import { Row, Col, Form } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsSlice";
import Message from "../components/Message";
import { useParams, Link, useNavigate } from "react-router-dom";
import Paginate from "../components/Paginate";
import CarouselComponent from "../components/CarouselComponent";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          {!keyword ? (
            <CarouselComponent />
          ) : (
            <Link className="btn btn-light mb-4" to="/">
              Back
            </Link>
          )}
          <Row>
            <Col md={2} style={{ color: "black" }}>
              <h6>
                <strong>Category</strong>
              </h6>
              <div className="border border-dark mb-3"></div>
              <div>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="All"
                  className="d-flex justify-content-between mx-2"
                  style={{ color: "black" }}
                  onChange={() => navigate("/")}
                />
                <hr />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Phone"
                  className="d-flex justify-content-between mx-2"
                  style={{ color: "black" }}
                  onChange={() => navigate("/search/phone")}
                />
                <hr />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Camera"
                  className="d-flex justify-content-between mx-2 text-red"
                  style={{ color: "black" }}
                  onChange={() => navigate("/search/camera")}
                />
                <hr />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Play Station"
                  className="d-flex justify-content-between mx-2 text-red"
                  style={{ color: "black" }}
                  onChange={() => navigate("/search/playstation")}
                />
              </div>
            </Col>
            <Col md={10}>
              <Row>
                {data.products.map((product) => {
                  return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
          <Paginate page={data.page} pages={data.pages} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
