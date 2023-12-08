import { Link } from "react-router-dom";
import pic4 from "../../assets/images/pic4.jpg";

const ListingCard = ({ listing }) => {
  <div className={"group cursor-pointer grid gap-10 md:grid-cols-2"}>
    <div
      className={
        " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   "
      }
    >
      <Link
        className={"relative block aspect-square"}
        // href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current}`}
      >
        <img
          src={pic4}
          alt={"Thumbnail"}
          //   alt={post.mainImage.alt || "Thumbnail"}
          className="object-cover transition-all"
          sizes="(max-width: 768px) 30vw, 33vw"
        />
      </Link>
    </div>

    <div className="flex items-center">
      <div>
        <CategoryLabel categories={post.categories} nomargin={minimal} />
        <h2
          className={cx(
            fontSize === "large"
              ? "text-2xl"
              : minimal
              ? "text-3xl"
              : "text-lg",
            fontWeight === "normal"
              ? "line-clamp-2 font-medium  tracking-normal text-black"
              : "font-semibold leading-snug tracking-tight",
            "mt-2"
          )}
        >
          <div>
            <span
              className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      "
            >
              Lorem Title
            </span>
          </div>
          {/* <Link
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug.current
            }`}
          >
            <span
              className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      "
            >
              {post.title}
            </span>
          </Link> */}
        </h2>

        <div className="hidden">
          <p className="mt-2 line-clamp-3 text-sm text-gray-500 ">
            Lorem Ipsum
            {/* <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug.current
                }`}
                legacyBehavior
              >
                {post.excerpt}
              </Link> */}
          </p>
        </div>

        <div className="mt-3 flex items-center space-x-3 text-gray-500 ">
          <div>
            {/* <Link href={`/author/${post.author.slug.current}`} legacyBehavior> */}
            <div className="flex items-center gap-3">
              <div className="relative h-5 w-5 flex-shrink-0">
                {/* {post.author.image && ( */}
                <img
                  src={pic4}
                  // alt={post?.author?.name}
                  className="rounded-full object-cover"
                  sizes="20px"
                />
                {/* )} */}
              </div>
              <span className="truncate text-sm">Author Name</span>
              {/* <span className="truncate text-sm">{post.author.name}</span> */}
            </div>
          </div>
          <span className="text-xs text-gray-300 ">
            &bull;
          </span>
          <time
            className="truncate text-sm"
            // dateTime={post?.publishedAt || post._createdAt}
          >
            December 23, 2023
            {/* {format(
              parseISO(post?.publishedAt || post._createdAt),
              "MMMM dd, yyyy"
            )} */}
          </time>
        </div>
      </div>
    </div>
  </div>;
};

export default ListingCard;
