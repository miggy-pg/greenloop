const Input = ({
  label = "",
  name = "",
  type = "text",
  className = "",
  inputClassName = "",
  isRequired = true,
  placeholder = "",
  register,
}) => {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-800 md:text-clamp-xs"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`bg-gray-50 border px-3 py-1 border-gray-300 text-gray-900 text-sm rounded-full block w-full focus:ring-blue-500 focus:border-blue-500 lg:w-clamp-form-input lg:text-clamp-xs md:px-3 ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        {...register}
      />
    </div>
  );
};

export default Input;
