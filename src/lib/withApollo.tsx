import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import React, { ReactNode } from 'react';

import AppContainer from '../containers/AppContainer';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Creates and Configures the Apollo Client
 *
 * @param {*} [initialState={}]
 * @param {*} [headers=undefined]
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
function createApolloClient(
    initialState = {},
    headers = undefined
): ApolloClient<NormalizedCacheObject> {
    const request = async (operation): Promise<void> => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include'
            },
            headers
        });
    };

    const requestLink = new ApolloLink(
        (operation, forward) =>
            new Observable(observer => {
                let handle;
                Promise.resolve(operation)
                    .then(oper => request(oper))
                    .then(() => {
                        handle = forward(operation).subscribe({
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer)
                        });
                    })
                    .catch(observer.error.bind(observer));

                return () => {
                    if (handle) handle.unsubscribe();
                };
            })
    );

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            requestLink,
            new HttpLink({
                uri: process.env.graphQlUrl, // Server URL (must be absolute)
                credentials: 'include', // Additional fetch() options like `credentials` or `headers`,
                fetch
            })
        ]),
        cache: new InMemoryCache().restore(initialState)
    });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 *
 * @param  {Object} initialState
 */
function initApolloClient(
    initialState,
    headers = undefined
): ApolloClient<NormalizedCacheObject> {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return createApolloClient(initialState, headers);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = createApolloClient(initialState);
    }

    return apolloClient;
}

interface WithApolloProps {
    apolloClient: ApolloClient<NormalizedCacheObject>;
    apolloState: any;
    pageProps: { [key: string]: any };
    headers: { [key: string]: string };
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 *
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}): any {
    const WithApollo = ({
        apolloClient,
        apolloState,
        ...pageProps
    }: WithApolloProps): ReactNode => {
        const client = apolloClient || initApolloClient(apolloState);
        return (
            <ApolloProvider client={client}>
                <AppContainer>
                    <PageComponent {...pageProps} />
                </AppContainer>
            </ApolloProvider>
        );
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        const displayName =
            PageComponent.displayName || PageComponent.name || 'Component';

        if (displayName === 'App') {
            console.warn('This withApollo HOC only works with PageComponents.');
        }

        WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async ctx => {
            const { AppTree } = ctx;
            const headers = ctx.req ? ctx.req.headers : undefined;
            // Initialize ApolloClient, add it to the ctx object so
            // we can use it in `PageComponent.getInitialProp`.
            const apolloClient = (ctx.apolloClient = initApolloClient(
                {},
                headers
            ));

            // Run wrapped getInitialProps methods
            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx);
            }

            // Only on the server:
            if (typeof window === 'undefined') {
                // When redirecting, the response is finished.
                // No point in continuing to render
                if (ctx.res && ctx.res.finished) {
                    return pageProps;
                }

                // Only if ssr is enabled
                if (ssr) {
                    try {
                        await getDataFromTree(
                            <AppTree
                                pageProps={{
                                    ...pageProps,
                                    apolloClient
                                }}
                            />
                        );
                    } catch (error) {
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error(
                            'Error while running `getDataFromTree`',
                            JSON.stringify(error, null, 2)
                        );
                    }

                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    Head.rewind();
                }
            }

            // Extract query data from the Apollo store
            const apolloState = apolloClient.cache.extract();

            return {
                ...pageProps,
                apolloState
            };
        };
    }

    return WithApollo;
}
