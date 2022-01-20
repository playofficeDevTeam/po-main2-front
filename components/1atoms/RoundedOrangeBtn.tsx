export default function App({
  children = <>버튼</>,
  onClick = () => {},
  trigger = true,
}) {
  return trigger ? (
    <div className="">
      <div className="h-0 relative -z-50">
        <div className="flex text-shadow-md bg-white px-7 py-3 rounded-full cursor-pointer text-white w-max items-center hover:opacity-80 shadow-sm transition duration-100 ">
          {children}
        </div>
      </div>
      <div
        className="flex text-shadow-md bg-gradient-to-r from-orange-500 to-yellow-500 px-7 py-3 rounded-full cursor-pointer text-white w-max items-center hover:opacity-80 shadow-sm transition duration-100 relative z-10 "
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  ) : (
    <div className="">
      <div className="flex text-shadow-md  bg-gray-200 px-7 py-3 rounded-full  text-white w-max items-center shadow-sm transition duration-100 relative z-10 ">
        {children}
      </div>
    </div>
  );
}
