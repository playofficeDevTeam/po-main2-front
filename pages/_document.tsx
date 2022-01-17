import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />

        <body>
          <Main />
          <NextScript />

          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            property="og:description"
            content="비주얼 인플루언서 마케팅, 키워드 블로그 체험단 마케팅, 바이럴 마케팅, 콘텐츠 마케팅, 브랜드 마케팅"
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
