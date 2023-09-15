import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Col, Row } from "react-bootstrap";
import { FiTrash, FiEdit } from "react-icons/fi";
import {toast} from 'react-toastify'
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetProductsQuery , useCreateProductMutation} from "../../slices/productsSlice";

function ProductsList() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, {isLoading: createLoading, error: createError}] = useCreateProductMutation()

  const handleDeleteProduct = (productId) => {
    console.log(`delete${productId}`);
  };

  const createProductHandler = async() => {
    if(window.confirm('are you sure you want to create product')){
      try {
        await createProduct()
        refetch()
      } catch (error) {
        toast.error(createError?.data?.message || createError?.error)
      }
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FiEdit /> Create products
          </Button>
        </Col>
      </Row>
      {createLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="" className="btn-sm mx-2" title="edit">
                      {" "}
                      <FiEdit style={{ color: "black" }} />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant=""
                    className="btn-sm mx-2"
                    title="delete"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    {" "}
                    <FiTrash style={{ color: "red" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductsList;
