import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsSlice";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import CarouselComponent from "../components/CarouselComponent";
import Meta from '../components/Meta'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
            {data.products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate page={data.page} pages={data.pages} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
