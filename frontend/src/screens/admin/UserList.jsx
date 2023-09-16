import { useGetUsersQuery } from "../../slices/userSliceApi"
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaCheckCircle, FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const deleteUser = (userId) => {

  }
  return (
    <>
      <h1>users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheckCircle style={{ color: 'green'}}/>
                    ) : (
                      <FaTimesCircle style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="link" className="btn-sm"><FaEdit /></Button>
                    </LinkContainer>
                    <Button 
                    variant="link" 
                    onClick={() => deleteUser(user._id)}
                    className="btn-sm">
                        <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default UserList;
