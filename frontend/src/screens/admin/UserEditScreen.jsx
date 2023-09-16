import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import {
  useGetUserDetailQuery,
  useUpdateUserMutation,
} from "../../slices/userSliceApi";

export default function ProductEditScreen() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };
    const result = await updateUser(updatedUser);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("user updated");
      refetch();
      navigate("/admin/userList");
    }
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit User</h2>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Price"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="is admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}/>
            </Form.Group>
            <Button className="my-3" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
