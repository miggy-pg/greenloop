const Body = ({children, bodyClass, pageId}) => {
  return (
    <div className={`w-full h-full mt-12 py-14 overflow-hidden ${bodyClass}`} id={`${pageId}`}>
      {children}
    </div>
  )
}

export default Body