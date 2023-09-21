import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsSlice";
import Message from "../components/Message";
import { useParams, Link} from "react-router-dom";
import Paginate from "../components/Paginate";
import CarouselComponent from "../components/CarouselComponent";
import Filter from "../components/Filter";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword, category } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
  });


  return (
    <div style={{ margin: "20px 0" }}>
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
          {!keyword || !category ? (
            <CarouselComponent />
          ) : (
            <Link className="btn btn-light mb-4" to="/">
              Back
            </Link>
          )}
          {data?.products.length === 0 ? (
            <Message variant={"info"}>
              sorry No {keyword || category} has found
            </Message>
          ) : (
            <Row>
              <Col md={2} style={{ color: "black" }}>
                <Filter />
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
          )}

          <Paginate page={data.page} pages={data.pages} keyword={keyword} />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
