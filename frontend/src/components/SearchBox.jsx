import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form} from "react-bootstrap";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex gap-2 m-auto">
        <Form.Group>
          <Form.Control
            type="text"
            value={keyword}
            name="q"
            placeholder="Search Product"
            className="mr-sm-2 ml-sm-5"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-light" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}

export default SearchBox;
