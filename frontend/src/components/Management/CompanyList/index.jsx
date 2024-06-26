import { useNavigate } from "react-router-dom";

import Table from "../../Common/Table";
import StyledButton from "../../Common/Button/StyledButton";
import defaultImage from "../../../assets/images/default-image.jpg";

export default function CompanyList({
  company,
  getCompanyData,
  handleDeleteCompany,
}) {
  const navigate = useNavigate();
  const {
    image,
    companyName,
    email,
    organizationType,
    province,
    username,
    cityMunicipality,
    id: companyId,
  } = company;

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
      <Table.Row type="default">************</Table.Row>
      <Table.Row type="default">{organizationType}</Table.Row>
      <Table.Row type="default">{province}</Table.Row>
      <Table.Row type="default">{cityMunicipality}</Table.Row>

      <Table.Row type="actionButton">
        <StyledButton
          $variations="primaryBlue"
          $size="small"
          onClick={() => getCompanyData(companyId)}
        >
          Update
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="danger"
          $size="small"
          onClick={() => handleDeleteCompany(companyId)}
        >
          Delete
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="secondary"
          $size="small"
          onClick={() => navigate(`/profile/${companyId}`)}
        >
          Details
        </StyledButton>
      </Table.Row>
    </tr>
  );
}
