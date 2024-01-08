import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import { uploadPost } from "../../api/user";
import { IoAddSharp } from "react-icons/io5";
import ButtonOutline from "../../components/ButtonOutline";

const wasteCategories = [
  "Plastic",
  "Plastic Bottle",
  "Glass",
  "Scrap Metal",
  "E-waste",
  "Textile",
  "Food waste",
  "Biodegradable Waste",
];

const Post = () => {
  const token = localStorage.getItem("user:token");

  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [post, setPost] = useState("");

  const handleFileInputChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("post", post);
      formData.append("wasteCategory", selectedCategory);
      formData.append("user", jwtDecode(token).userId);
      console.log("formData: ", formData);
      const res = await uploadPost(formData);
      setSuccess(res.status === 200 ? true : false);

      setData({
        image: "",
      });
      setSelectedCategory("");
      setPost("");
    } catch (err) {
      console.log("error: ", err);
    } finally {
      setSelectedCategory("");
      setPost("");
    }
  };

  return (
    <div className="bg-[#F8F8F8] w-full h-screen pt-[9rem] pb-11" id="post">
      <div className="max-w-screen-md px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <div className="bg-white border border-gray-200 px-12 shadow-sm rounded-3xl  ">
            <article className="p-6">
              <footer className="flex justify-center items-center">
                <div className="flex items-center mb-5">
                  <p className="inline-flex items-center text-3xl font-[500] text-[#4F772D]">
                    Post a Waste
                  </p>
                </div>
              </footer>
              <hr className="py-3" />
              <textarea
                id="post"
                name="post"
                rows="4"
                className="text-gray-900 text-left w-full overflow-y-hidden mb-3 focus:outline-none focus: border-0"
                placeholder="Say something about the waste"
                onChange={(e) => setPost(e.target.value)}
              />

              <div className="grid">
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-2/5 p-2.5"
                  onChange={handleCategoryChange}
                >
                  <option value="">Select an option</option>
                  {wasteCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </article>

            {data.image ? (
              <img
                src={data.image ? URL.createObjectURL(data.image) : null}
                alt={data.image ? data.image.name : null}
                className="relative w-full h-[20rem] border-2 bg-white rounded-lg flex justify-center items-center mb-5"
              />
            ) : (
              <>
                <div className="relative w-full h-[20rem] border-dashed border-[#e9e4e4] border-2 bg-white rounded-lg flex justify-center items-center mb-5">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute cursor-pointer"
                  >
                    <IoAddSharp className="w-14 h-14 bg-[#F1F1F1] text-slate-400 rounded-lg m-2" />
                    <p className="text-slate-400">Add Image</p>
                  </label>
                </div>
              </>
            )}
            {data.image && (
              <>
                <label
                  htmlFor="image-upload"
                  className="w-full px-7 py-1 cursor-pointer mb-0 border rounded-full bg-[#F8F8F8]"
                >
                  Replace
                </label>
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </>
            )}
            <ButtonOutline className="w-full my-10" type="submit">
              Upload
            </ButtonOutline>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
