import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userSliceApi";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaCheckCircle, FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function UserList() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const deleteUserHandler = async (userId) => {
    if (window.confirm("Are you sure?⚠")) {
      try {
        const res = await deleteUser(userId);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.data?.message || err?.message || error?.error);
      }
    }
  };
  return (
    <>
      <h1>users</h1>
      {deleteLoading && <Loader />}
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
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheckCircle style={{ color: "green" }} />
                    ) : (
                      <FaTimesCircle style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="link" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="link"
                      onClick={() => deleteUserHandler(user._id)}
                      className="btn-sm"
                    >
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
