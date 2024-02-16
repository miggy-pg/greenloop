import { useNavigate } from "react-router-dom";

import Table from "../../Table";
import StyledButton from "../../Button/StyledButton";
import defaultImage from "../../../assets/default-image.jpg";

export default function UserList({
  image,
  companyName,
  email,
  organizationType,
  password,
  province,
  username,
  cityMunicipality,
  userId,
  getUserData,
  deleteUserAction,
}) {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-100">
      <Table.Row type="default">
        <img
          src={image ? image : defaultImage}
          className="rounded-full w-10 h-10"
        />
      </Table.Row>
      <Table.Row type="name">
        <div className="text-sm font-semibold text-gray-900 sm:text-md md:text-sm lg:text-sm">
          {companyName}
        </div>
      </Table.Row>
      <Table.Row type="default">{email}</Table.Row>
      <Table.Row type="default">{username}</Table.Row>
      <Table.Row type="default">{password}</Table.Row>
      <Table.Row type="default">{organizationType}</Table.Row>
      <Table.Row type="default">{province}</Table.Row>
      <Table.Row type="default">{cityMunicipality}</Table.Row>

      <Table.Row type="actionButton">
        <StyledButton
          $variations="primaryBlue"
          $size="small"
          onClick={() => {
            getUserData(userId);
          }}
        >
          Update
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="danger"
          $size="small"
          onClick={() => deleteUserAction(userId)}
        >
          Delete
        </StyledButton>
      </Table.Row>
      <Table.Row>
        <StyledButton
          $variations="secondary"
          $size="small"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          Details
        </StyledButton>
      </Table.Row>
    </tr>
  );
}
