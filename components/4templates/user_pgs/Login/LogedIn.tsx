function App() {
  const instaLoginOnclick = () => {
    console.log("insta login");
  };
  return (
    <>
      <div className="pc-max">로그인됨</div>
      <div className="pc-max">
        <a
          href={process.env.NEXT_PUBLIC_API_HOST + "/auth/facebook"}
          className="px-2 py-1 my-4 border rounded w-max cursor-pointer block"
          onClick={() => {
            instaLoginOnclick();
          }}
        >
          인스타 로그인 버튼
        </a>
      </div>
    </>
  );
}
export default App;

