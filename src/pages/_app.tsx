import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import App from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import Nprogress from '../components/Nprogress';
import { globalStyles } from '../lib/globalStyles';
import { theme } from '../theme';

const ToasterContainer = dynamic(() => import('../components/toast/Toast'));
// import Favicon from '../components/Favicon';

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>Boilerplate - Next TypeScript Tailwind</title>
                    {/** <Favicon /> */}
                </Head>
                <ThemeProvider theme={theme}>
                    <Global styles={globalStyles} />
                    <Nprogress />
                    <ToasterContainer />
                    <Component {...pageProps} />
                </ThemeProvider>
            </>
        );
    }
}

export default MyApp;
