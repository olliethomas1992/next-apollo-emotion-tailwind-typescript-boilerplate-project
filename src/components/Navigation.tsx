import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import tw from 'tailwind.macro';

import { LOGOUT_MUTATION } from '../actions/auth';
import { CURRENT_USER_QUERY } from '../actions/user';
import ButtonLink from '../components/buttons/ButtonLink';

const NavigationStyles = styled.nav`
    ${tw` flex justify-between items-center p-6 shadow border-b border-gray-500 `}
    a {
        ${tw` no-underline inline-block mr-2 `}
    }
`;

const Navigation = (): JSX.Element => {
    const { data, client } = useQuery(CURRENT_USER_QUERY, {
        errorPolicy: 'ignore'
    });

    const [logout] = useMutation(LOGOUT_MUTATION);

    const onLogout = (): void => {
        logout().then(() => client.resetStore());
    };

    return (
        <header>
            <NavigationStyles>
                <div>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                    <Link href="/contact">
                        <a>Contact</a>
                    </Link>
                </div>
                <div>
                    <Link href="/users">
                        <a>Protected</a>
                    </Link>
                </div>
                <div>
                    {data && data.currentUser && (
                        <>
                            <span>Hello, {data.currentUser.name}</span> |
                            <ButtonLink type="button" onClick={onLogout}>
                                Logout
                            </ButtonLink>
                        </>
                    )}
                    {!data && (
                        <>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </>
                    )}
                </div>
            </NavigationStyles>
        </header>
    );
};

export default Navigation;
