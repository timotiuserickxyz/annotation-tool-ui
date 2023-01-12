import React from 'react';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';

export default class CustomDocument extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
        originalRenderPage({
          enhanceApp: (App) => (
            props,
          ): React.ReactElement<{
            sheet: ServerStyleSheet;
          }> =>
            styledComponentsSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {materialUiSheets.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): React.ReactElement {
    return (
      <Html lang="ja-JP">
        <Head>
          <title>Annotation Tool</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          {/* PWA primary color */}
          {/*<meta name="theme-color" content={theme.palette.primary.main} />*/}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
