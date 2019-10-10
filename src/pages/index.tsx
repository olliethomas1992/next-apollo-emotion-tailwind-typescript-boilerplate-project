import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { SizeMe } from 'react-sizeme';
import tw from 'tailwind.macro';

import { withApollo } from '../lib/withApollo';
import { theme } from '../theme';

const Heading = tw.h1`
    text-blue-500
    bg-pink-500
    border
`;

const HELLO_QUERY = gql`
    query HELLO_QUERY($name: String!) {
        hello(name: $name)
    }
`;

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
    const isMedScreen = useMediaQuery({
        query: `(min-width: ${theme.screens.md})`
    });

    const { data, loading, error } = useQuery(HELLO_QUERY, {
        variables: {
            name: 'Ollie'
        }
    });

    if (error) return <div>Error</div>;

    return (
        <>
            <Heading>Hello world! - user agent: {userAgent}</Heading>
            <div>Is a medium screen: {isMedScreen.toString()}</div>
            {loading ? 'Loading...' : data.hello}
            <SizeMe>
                {({ size }) => <div>Screen Width is: {size.width}</div>}
            </SizeMe>
        </>
    );
};

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers['user-agent'] || ''
        : navigator.userAgent;
    return { userAgent };
};

export default withApollo(Home);
