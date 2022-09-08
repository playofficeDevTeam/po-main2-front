import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App() {
  const router = useRouter();
  useEffect(() => {
    const asyncEffect = async () => {
      const accessToken = router.query.accessToken;
      const myPageRes = await axios.get(
        `https://graph.facebook.com/v14.0/me/accounts?access_token=${accessToken}`
      );
      const pageId = myPageRes.data.data[0].id;
      const myBusinessAccountRes = await axios.get(`
      https://graph.facebook.com/v14.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}
      `);
      const instagramBusinessAccount =
        myBusinessAccountRes.data.instagram_business_account.id;
      const myMediaRes = await axios.get(`
      https://graph.facebook.com/v14.0/${instagramBusinessAccount}/media?access_token=${accessToken}
      `);
      const myInsight = await axios.get(`
      https://graph.facebook.com/v14.0/${instagramBusinessAccount}/insights?metric=impressions,reach,profile_views&period=day&access_token=${accessToken}
      `);
      await console.log(myInsight);
    };
    if (router.query.accessToken) {
      asyncEffect();
    }
  }, [router]);

  return <>로그인 성공</>;
}
export default App;
