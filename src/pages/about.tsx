import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import tw from 'tailwind.macro';

import { withApollo } from '../lib/withApollo';
import { ThemeProp } from '../theme';

const Title = styled.h1<ThemeProp>`
    ${tw`text-blue-500 hover:text-orange-500`}

    @media(min-width: ${(p): string => p.theme.screens.md}) {
        ${tw`text-green-500 hover:text-pink-500`}
    }
`;

export const AboutPage = (): ReactNode => {
    return (
        <>
            <Title>About Page</Title>
        </>
    );
};

export default withApollo(AboutPage, {
    ssr: false
});
