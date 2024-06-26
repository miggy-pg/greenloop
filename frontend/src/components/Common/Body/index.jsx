const Body = ({ children, bodyClass, pageId }) => {
  return (
    <div
      className={`w-full h-full overflow-hidden ${bodyClass}`}
      id={`${pageId}`}
    >
      {children}
    </div>
  );
};

export default Body;
