import Table from "../../components/Table";
import UserList from "../../components/Management/UserList";

export default function Dasbhboard() {
  return (
    <div className="flex flex-col w-full h-screen mt-12 py-14">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <Table>
              {/* <Table.Header
                data={bookingHeaders}
                render={(header) => (
                  <Table.Column key={header} header={header} />
                )}
              /> */}
              <Table.Body>
                <UserList />
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
