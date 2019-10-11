import styled from '@emotion/styled';
import React from 'react';
import tw from 'tailwind.macro';

const PageErrorStyles = styled.div`
    ${tw` flex justify-center items-center h-full mt--10 text-xl `};
`;

const PageError = (props: any): JSX.Element => {
    return (
        <PageErrorStyles>
            <p>Sorry, there has been an error.</p>
        </PageErrorStyles>
    );
};

export { PageError as default };
