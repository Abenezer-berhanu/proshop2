import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Meassage from "../../components/Message";
import {
  useUpdateProductMutation,
  useGetProductDetailQuery,
} from "../../slices/productsSlice";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.product.name);
      setPrice(product.product.price);
      setImage(product.product.image);
      setBrand(product.product.brand);
      setCategory(product.product.category);
      setCountInStock(product.product.countInStock);
      setDescription(product.product.description);
    }
  }, [isLoading]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    const result = await updateProduct(updatedProduct)
    if(result.error){
      toast.error(result.error)
    }else{
      toast.success('Product updated')
      navigate('/admin/productList')
    }
  }
  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
          <FormContainer>
            <h2>Edit Product</h2>
            {loadingUpdate && <Loader />}

            {isLoading ? <Loader /> : error ? <Meassage>{error}</Meassage> : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>
                {/* IMAGE PLACEHOLDER */}
                {/* <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="text" placeholder="Enter Image Url" value={image} onChange={e => setImage(e.target.value)}/>
                </Form.Group> */}
                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={e => setBrand(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="countInStock">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" placeholder="Enter Quantity" value={countInStock} onChange={e => setCountInStock(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
                <Button className="my-3" variant="primary" type="submit">Update</Button>
              </Form>
            )}
          </FormContainer>
    </>
  );
}
