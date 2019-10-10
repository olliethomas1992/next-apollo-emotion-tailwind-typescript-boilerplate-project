import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import tw from 'tailwind.macro';

import { withApollo } from '../lib/withApollo';

const Title = styled.h1`
    ${tw` text-blue-500 md:text-green-500 lg:text-red-500 hover:text-orange-500 `}
`;

export const ContactPage = (): ReactNode => {
    return (
        <>
            <Title>Contact Page</Title>
        </>
    );
};

export default withApollo(ContactPage, {
    ssr: false
});
