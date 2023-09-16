import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setCredntials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { useUpdateUserProfileMutation } from "../slices/userSliceApi";

function UserProfile() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!(password === confirmPassword)) {
        toast.warn("Password and confirm password is not same");
      } else {
        if (window.confirm("Are you sure?")) {
          const res = await updateUser({ name, password, password });
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
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default UserProfile;
