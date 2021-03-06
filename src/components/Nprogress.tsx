import { css, Global, SerializedStyles } from '@emotion/core';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';

import { Theme } from '../theme';

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});

Router.events.on('routeChangeError', () => {
    NProgress.done();
});

const Nprogress = (): JSX.Element => {
    return (
        <Global
            styles={(theme: Theme): SerializedStyles => css`
                /* Make clicks pass-through */
                #nprogress {
                    pointer-events: none;
                }

                #nprogress .bar {
                    background: ${theme.colors.primary};

                    position: fixed;
                    z-index: 1031;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: ${theme.height[1]};
                    display: block;
                }

                /* Fancy blur effect */
                #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow: 0 0 10px ${theme.colors.primary},
                        0 0 5px ${theme.colors.primary};
                    opacity: 1;

                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                    -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
                }

                /* Remove these to get rid of the spinner */
                #nprogress .spinner {
                    display: block;
                    position: fixed;
                    z-index: 1031;
                    top: 15px;
                    right: 15px;
                }

                #nprogress .spinner-icon {
                    width: 18px;
                    height: 18px;
                    box-sizing: border-box;

                    border: solid 2px transparent;
                    border-top-color: ${theme.colors.primary};
                    border-left-color: ${theme.colors.primary};
                    border-radius: 50%;

                    -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
                }

                .nprogress-custom-parent {
                    overflow: hidden;
                    position: relative;
                }

                .nprogress-custom-parent #nprogress .spinner,
                .nprogress-custom-parent #nprogress .bar {
                    position: absolute;
                }

                @-webkit-keyframes nprogress-spinner {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
                @keyframes nprogress-spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}
        />
    );
};

export default Nprogress;
