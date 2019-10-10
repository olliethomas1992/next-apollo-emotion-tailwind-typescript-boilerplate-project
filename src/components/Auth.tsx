import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import React from 'react';

import { CURRENT_USER_QUERY } from '../actions/user';
import Loader from '../components/Loader';

interface AuthProps {
    children: JSX.Element;
}

const Auth = (props: AuthProps): JSX.Element => {
    const { loading, error } = useQuery(CURRENT_USER_QUERY);
    if (loading) return <Loader />;
    if (error) {
        // console.log(JSON.stringify(error, null, 2));
        Router.push({
            pathname: '/login',
            query: {
                prevPage: '/users'
            }
        });
    }
    return props.children;
};

export { Auth as default };
