import { FaWindowClose } from "react-icons/fa";
import StyledFormContainer from "../../../Common/FormContainer";
import Button from "../../../Common/Button";

export default function EditUser(props) {
  return (
    <StyledFormContainer $expandEdit={props.expandEdit}>
      <h5 className="md:text-md mb-4 inline-flex items-center text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 lg:text-2xl">
        Update item
      </h5>
      <Button
        $size="medium"
        $variations="closeTab"
        onClick={() => props.setExpandEdit((curr) => !curr)}
      >
        <FaWindowClose className="h-8 w-8 fill-current text-slate-400 transition duration-300 ease-in-out hover:text-slate-500 " />
      </Button>
      <form>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="md:text-md mb-2 block text-sm font-bold text-gray-900 dark:text-white lg:text-2xl"
            >
              Name
            </label>
            <input
              type="text"
              name="title"
              className="focus:ring-primary-600 md:text-md focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 lg:text-2xl" // value="Education Dashboard"
              placeholder="Type product name"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="md:text-md mb-2 block text-sm font-bold text-gray-900 dark:text-white lg:text-2xl"
            >
              Technology
            </label>
            <select className="focus:ring-primary-500 md:text-md focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 lg:text-2xl">
              <option defaultValue="">Flowbite</option>
              <option value="RE">React</option>
              <option value="AN">Angular</option>
              <option value="VU">Vue JS</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="md:text-md mb-2 block text-sm font-bold text-gray-900 dark:text-white lg:text-2xl"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              className="focus:ring-primary-600 focus:border-primary-600 md:text-md dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 lg:text-2xl" // value="2999"
              placeholder="$149"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="md:text-md mb-2 block text-sm font-bold text-gray-900 dark:text-white lg:text-2xl"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="focus:ring-primary-500 md:text-md focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 lg:text-2xl"
              placeholder="Enter event description here"
            />
          </div>
          <div>
            <label
              htmlFor="discount"
              className="md:text-md mb-2 block text-sm font-bold text-gray-900 dark:text-white lg:text-2xl"
            >
              Discount
            </label>
            <select className="focus:ring-primary-500 md:text-md focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 lg:text-2xl">
              <option defaultValue="">No</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
            </select>
          </div>
        </div>
        <div className="bottom-0 left-0 mt-4 flex w-full space-x-4 pb-6 sm:absolute sm:mt-0 sm:px-4">
          <Button $size="large" $variations="primary">
            Update
          </Button>
          <Button
            $size="large"
            $variations="secondary"
            className="ml-3"
            onClick={() => props.setExpandEdit((curr) => !curr)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </StyledFormContainer>
  );
}
