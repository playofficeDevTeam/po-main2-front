import axios from "axios";

export default function App() {
  const getInsight = async () => {
    try {
      const insightRes = await axios.get(
        "https://graph.facebook.com/v14.0/17841405840698627/insights?metric=impressions,reach,profile_views&period=day&access_token=EAALz2YzrmHgBAIZCSu8X31CaSUUZCw7FNISDwc0xqVBZASCxo7k6FR1pHqJMDi47uUjOxv8TGiqvJC6pcar04JlfdLmlTCAz2AANybdyZBtRNW47DyBWX0IAVrwtoCtb4hxii9YpMXKssUQYbCFDzUQJOaspS036EIb25FMCm3aapcFWS40d8hoGFgJ1gv93Pfque8j4DbtZAIJnwgvkmm83ZBZCD4aL6jdIfqZBV59YBwaYPy3F1GKxQRTFnDC3PfEZD"
      );
      console.log(insightRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <a
        href={process.env.NEXT_PUBLIC_API_HOST + "/auth/facebook"}
        className="px-2 py-1 mb-4 rounded border block"
      >
        페이스북 로그인
      </a>

      <div
        className="px-2 py-1 rounded border cursor-pointer"
        onClick={() => {
          getInsight();
        }}
      >
        인사이트 가져오기
      </div>
    </div>
  );
}
