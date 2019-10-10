import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import tw from 'tailwind.macro';

import Loader from '../components/Loader';

const USERS_QUERY = gql`
    query USERS_QUERY {
        users {
            id
            name
            email
        }
    }
`;

const UserList = styled.ul`
    ${tw` px-0 py-2 m-0 bg-white rounded-lg `}

    li {
        ${tw` list-none inline-block py-4 px-8 flex items-center justify-between hover:bg-gray-200 `}
    }
`;

const Users = (): JSX.Element => {
    const { error, loading, data } = useQuery(USERS_QUERY);

    if (loading) return <Loader />;

    if (error) return <div>Error...</div>;

    const { users } = data;
    return (
        <div>
            <h3>User list</h3>
            <UserList>
                {users.map(
                    (user): JSX.Element => {
                        return (
                            <li key={user.id}>
                                <span>{user.name}</span>
                                <span>{user.email}</span>
                            </li>
                        );
                    }
                )}
            </UserList>
        </div>
    );
};

export { Users as default };
