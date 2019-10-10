import React from 'react';

import { theme } from '../theme';
/**
 * Use http://www.favicomatic.com for Favicons.
 */
const Favicon = (): JSX.Element => (
    <>
        <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="/public/favicons/apple-touch-icon-57x57.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/public/favicons/apple-touch-icon-114x114.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/public/favicons/apple-touch-icon-72x72.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/public/favicons/apple-touch-icon-144x144.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="/public/favicons/apple-touch-icon-60x60.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/public/favicons/apple-touch-icon-120x120.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="/public/favicons/apple-touch-icon-76x76.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/public/favicons/apple-touch-icon-152x152.png"
        />
        <link
            rel="icon"
            type="image/png"
            href="/public/favicons/favicon-196x196.png"
            sizes="196x196"
        />
        <link
            rel="icon"
            type="image/png"
            href="/public/favicons/favicon-96x96.png"
            sizes="96x96"
        />
        <link
            rel="icon"
            type="image/png"
            href="/public/favicons/favicon-32x32.png"
            sizes="32x32"
        />
        <link
            rel="icon"
            type="image/png"
            href="/public/favicons/favicon-16x16.png"
            sizes="16x16"
        />
        <link
            rel="icon"
            type="image/png"
            href="/public/favicons/favicon-128.png"
            sizes="128x128"
        />
        <meta name="msapplication-TileColor" content={theme.colors.primary} />
        <meta
            name="msapplication-TileImage"
            content="/public/favicons/mstile-144x144.png"
        />
        <meta
            name="msapplication-square70x70logo"
            content="/public/favicons/mstile-70x70.png"
        />
        <meta
            name="msapplication-square150x150logo"
            content="/public/favicons/mstile-150x150.png"
        />
        <meta
            name="msapplication-wide310x150logo"
            content="/public/favicons/mstile-310x150.png"
        />
        <meta
            name="msapplication-square310x310logo"
            content="/public/favicons/mstile-310x310.png"
        />
        <meta
            name="application-name"
            content="Boilerplate - Next TypeScript Tailwind"
        />
        <meta name="msapplication-TileColor" content={theme.colors.secondary} />
        <meta name="theme-color" content={theme.colors.secondary} />
    </>
);
export default Favicon;
