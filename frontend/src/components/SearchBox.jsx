import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

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
      <Form
        onSubmit={handleSubmit}
        style={{ width: "50%", position: "relative" }}
      >
        <Form.Group>
          <Form.Control
            style={{ width: "100%", borderRadius: "0 30px 30px 0" }}
            type="text"
            value={keyword}
            name="q"
            placeholder="Search Product"
            className="mr-sm-2 ml-sm-5"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant=""
          type="submit"
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <AiOutlineSearch size={20} />
        </Button>
      </Form>
    </>
  );
}

export default SearchBox;
