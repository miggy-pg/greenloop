import { Link } from "react-router-dom";

const CategoryLabel = ({ categories }) => {
  console.log(categories);

  return (
    <div className="flex gap-3">
      {/* {categories?.length &&
        categories.map((category, index) => (
          <Link href={`/category/${category.slug.current}`} key={index}>
            <span color={category.color}>{category.title}</span>
          </Link>
        ))} */}
    </div>
  );
};

export default CategoryLabel;
