import Table from "../../components/Table";
import UserList from "../../components/Management/UserList";
import { useEffect, useState } from "react";
import { fetchusers } from "../../api/user";

export default function Dasbhboard() {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await fetchusers();
      console.log("res: ", data);
      setUsers(data);
      setIsLoading(false);
    };
    fetchUsers();

    document.title = "Green Loop | Users";
  }, []);

  console.log("users: ", users);

  return (
    <div className="bg-[#F8F8F8] w-full h-screen mt-16 py-14" id="homepage">
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col text-center justify-center">
        <div className="inline-block min-w-full  align-middle">
          <div className="overflow-hidden shadow rounded-lg">
            <Table>
              {/* <Table.Header
                data={bookingHeaders}
                render={(header) => (
                  <Table.Column key={header} header={header} />
                )}
              /> */}
              <Table.Body>
                {!isLoading &&
                  users.map((user) => (
                    <UserList key={user.id} id={user.id} props={user} />
                  ))}
                <UserList />
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
