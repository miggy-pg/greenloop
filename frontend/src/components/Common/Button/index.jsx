const Button = ({
  label = "Button",
  type = "submit",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center lg:text-clamp-xs lg:py-2 md:px-2 ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
