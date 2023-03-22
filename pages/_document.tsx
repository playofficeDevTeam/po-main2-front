import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID || "";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 픽셀 설치 */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />

          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />

          <title>포케팅 - 좋은 성과는 결국, 크리에이터 콘텐츠</title>
          <meta
            name="description"
            property="og:description"
            content="광고 소재와 상세페이지에 사용하고 마케팅 성과를 개선해보세요. 포케팅 크리에이터 콘텐츠는 고객의 공감을 쉽게 얻을 수 있는 가장 좋은 콘텐츠입니다."
          />

          {/* 카드링크 이미지 */}
          <meta name="imgae" property="og:image" content="/poketingCard.png" />
          <link rel="apple-touch-icon" href="/favicon.ico" />

          {/* 페이스북 도메인인증 */}
          <meta
            name="facebook-domain-verification"
            content="a3mioai8v7opoq5ucmqa9yg9ikjnsm"
          />

          {/* 폰트어썸 */}
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
            integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
            crossOrigin="anonymous"
          />

          {/* 슬릭캐로셀 */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
