import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Paginate({
  page,
  pages,
  isAdmin = false,
  keyword = "",
  totalPages,
  fashionPage,
}) {
  const navigate = useNavigate();

  return (
    <Pagination>
      {pages > 1 &&
        [...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productList/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}

      {totalPages > 1 &&
        [...Array(totalPages).keys()].map((x) => (
          <Pagination.Item
            active={x + 1 === fashionPage}
            key={x + 1}
            onClick={() =>
              navigate(
                `/search/gallery/${x + 1}/fashion?trend=fashion%20and%20design`
              )
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
    </Pagination>
  );
}

export default Paginate;
