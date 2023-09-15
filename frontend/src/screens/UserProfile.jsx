import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux/es/hooks/useSelector";

function UserProfile() {
    const userInfo = useSelector(state => state.auth.userInfo)
  return (
    <>
      <Row>
        <Col md={4}>
          <h2>User Profile</h2>
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="email" placeholder={userInfo.name} />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder={userInfo.email} />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="email" placeholder={'password'} />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="email" placeholder={'Confirm password'} />
            </Form.Group>
            <Button>Update</Button>
          </Form>
        </Col>
        <Col md={8}>
        <h2><strong>My Orders</strong></h2>
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
                
            </tbody>
        </Table>
        </Col>
      </Row>
    </>
  );
}

export default UserProfile;
