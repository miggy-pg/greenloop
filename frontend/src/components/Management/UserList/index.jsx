import { useNavigate } from "react-router-dom";
import StyledButton from "../../Button/StyledButton";
import Row from "../../Common/Row";

export default function UserList({ props }) {
  // const { email, organizationType, password, province, username } = props;

  console.log("props: ", props);

  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-100">
      <Row type="name">
        <div className="md:text-md text-sm font-semibold text-gray-900 sm:text-sm lg:text-lg">
          Company Name
        </div>
      </Row>
      <Row type="default">Name</Row>
      <Row type="default">Test</Row>
      <Row type="default">Price</Row>
      <Row type="default">Status</Row>
      <Row type="default">IsAdmin</Row>

      <Row type="actionButton">
        <StyledButton
          $variations="primaryBlue"
          $size="medium"
          // onClick={() => setExpandedUpdate((curr) => !curr)}
        >
          Update
        </StyledButton>
        <StyledButton
          $variations="danger"
          $size="medium"
          // onClick={() => setExpandDelete((curr) => !curr)}
        >
          Delete
        </StyledButton>
      </Row>
      <Row>
        <StyledButton
          $variations="primaryBlue"
          $size="medium"
          // onClick={() => navigate(`/bookings/${id}`)}
        >
          Detail
        </StyledButton>
      </Row>
    </tr>
  );
}
