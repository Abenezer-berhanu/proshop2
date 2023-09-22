
import Paginate from "./Paginate";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsSlice";
import { Col, Row } from "react-bootstrap";
import Filter from "./Filter";
import Loader from "./Loader";
import Message from "./Message";
import { motion } from "framer-motion";

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  let queryFashion = searchParams.get("trend") || "";
  let { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    queryFashion,
    pageNumber,
  });


  return (
    <>
      <div className="py-2">
        <Link to={"/"} className="btn btn-light">
          Back
        </Link>
        <Row className="py-2">
          <Col md={3} style={{ color: "black" }}>
            <Filter />
          </Col>
          <Col>
            <div className="image-container">
              <div className="header">
                <span>Fashion</span> Gallery
              </div>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant={"info"}>{error}</Message>
              ) : (
                <>
                  <div className="box">
                    {data.fashionImages.map((image, index) => (
                      <motion.div
                        key={image._id}
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 + index * 0.09 }}
                        className="show-image"
                      >
                        <img src={image.image} alt="" />
                      </motion.div>
                    ))}
                  </div>
                  <Paginate fashionPage={data.page} totalPages={data.pages} />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Gallery;
