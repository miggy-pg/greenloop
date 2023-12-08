import Card from "../../components/Card";
import PostCard from "../../components/PostCard";
import { IoAddSharp } from "react-icons/io5";
import ButtonOutline from "../../components/ButtonOutline"

const Post = () => {
  return (
    <div className="bg-[#F8F8F8] w-full h-screen pt-[9rem] pb-11" id="post">
      <div className="max-w-screen-md px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="bg-white border border-gray-200 px-12 shadow-sm rounded-3xl  ">
        <article className="p-6">
          <footer className="flex justify-center items-center">
            <div className="flex items-center mb-5">
              <p className="inline-flex items-center text-3xl font-[500] text-[#4F772D]">
                Post a Waste
              </p>
            </div>
          </footer>
          <hr className="py-3"/>
          <textarea rows="4" className="text-gray-900 text-left w-full overflow-y-hidden mb-3 focus:outline-none focus: border-0" placeholder="Say something about the waste" />
          <div className="grid">
            <span className="flex">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 items-start">Select Category</label>
              </span>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-2/5 p-2.5 ">
                <option selected="">Flowbite</option>
                <option value="RE">React</option>
                <option value="AN">Angular</option>
                <option value="VU">Vue JS</option>
            </select>
          </div>
        </article>
        <div className="relative w-full h-[20rem] border-dashed border-[#e9e4e4] border-2 bg-white rounded-lg flex justify-center items-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            // onChange={handleFileInputChange}
          />
          <label htmlFor="file-upload" className="absolute cursor-pointer">
            <IoAddSharp className="w-14 h-14 bg-[#F1F1F1] text-slate-400 rounded-lg m-2"/>
            <p className="text-slate-400">Add Image</p>
          </label>
        </div>
        <ButtonOutline className="w-full my-10">Upload</ButtonOutline>
      </div>
      </div>
    </div>
  );
};

export default Post;
