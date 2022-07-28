export default function App() {
  return (
    <>
      <div className="p-4">
        <a
          href={process.env.NEXT_PUBLIC_API_HOST + "/auth/facebook"}
          className="px-2 py-1 rounded border"
        >
          페이스북 로그인
        </a>
      </div>
    </>
  );
}
