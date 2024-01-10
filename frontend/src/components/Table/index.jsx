import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export default function Table({ children }) {
  const [sorting, setSorting] = useState({ field: "id", ascending: false });

  return (
    <TableContext.Provider value={{ sorting, setSorting }}>
      <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
        {children}
      </table>
    </TableContext.Provider>
  );
}

function Column({ header }) {
  const { sorting, setSorting } = useContext(TableContext);

  return (
    <th
      scope="col"
      className="cursor-pointer p-4 text-left text-xl font-medium uppercase tracking-wider text-gray-500 hover:bg-zinc-200"
      onClick={() => setSorting(header, !sorting.ascending)}
    >
      {header}
    </th>
  );
}

function Header({ data, render }) {
  return (
    <thead className="bg-gray-100 rounded-full">
      <th scope="col" className="w-4 p-12 ">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="text-black focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border-gray-300 bg-gray-50"
          />
          <label htmlFor="checkbox-all" className="sr-only">
            checkbox
          </label>
        </div>
      </th>
      {data.map(render)}
    </thead>
  );
}

function Row({ children, type }) {
  const rowType = {
    checkbox: "w-4 p-8",
    actionButton: "space-x-2 whitespace-nowrap p-8",
    status:
      "mr-2 rounded-md border border-green-100 bg-green-100 px-2.5 py-0.5 text-2xl font-medium text-green-800 dark:border-green-500 dark:bg-gray-700 dark:text-green-400",
    default:
      "md:text-md whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white sm:text-sm lg:text-2xl",
  };

  if (type === "name")
    return (
      <td className="whitespace-nowrap p-8 text-sm font-normal text-gray-500 dark:text-gray-400">
        <span className="flex items-center">{children}</span>
      </td>
    );
  return (
    <td className="whitespace-nowrap p-4">
      <span className={rowType[type]}>{children}</span>
    </td>
  );
}

function Body({ children }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white rounded-full">
      {children}
    </tbody>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Column = Column;
Table.Body = Body;
