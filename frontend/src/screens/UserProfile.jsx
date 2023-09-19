import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setCredntials } from "../slices/authSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from "../slices/userSliceApi";
import { FiClock } from "react-icons/fi";

function UserProfile() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const {
    data: userData,
    isLoading: profileLoading,
    error,
  } = useGetUserProfileQuery({ userId: userInfo._id });
  const dispatch = useDispatch();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!(password === confirmPassword)) {
        toast.warn("Password confirmation mistake");
      } else {
        if (window.confirm("Are you sure?")) {
          const res = await updateUser({ name, password, email });
          dispatch(setCredntials(res.data));
          toast.success("User Updated Successfully");
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={"Confirm password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Update</Button>
            {isLoading && <Loader />}
          </Form>
        </Col>
        <Col md={8}>
          <h2>
            <strong>My Orders</strong>
          </h2>
          {profileLoading ? (
            <Loader />
          ) : error ? (
            <Message variant={"danger"}>{error}</Message>
          ) : userData.orders.length === 0 ? (
            <Message variant={"info"}>
              Sorry you didn't order anything yet
            </Message>
          ) : (
            <Table striped hover responsive className="tale-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {userData.orders.map((order) => (
                  <tr key={order._id}>
                    <th>{order._id}</th>
                    <th>{order.createdAt.substring(0, 10)}</th>
                    <th>${order.totalPrice}</th>
                    <td>
                      {order.isPaid ? (
                        order.isPaidAt.substring(0, 10)
                      ) : (
                        <FiClock style={{ color: "green" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FiClock style={{ color: "green" }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default UserProfile;
