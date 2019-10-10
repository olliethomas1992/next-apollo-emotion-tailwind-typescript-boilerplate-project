import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import tw from 'tailwind.macro';

import Navigation from '../components/Navigation';
import { ThemeProp } from '../theme';

const AppContainerStyles = styled.div<ThemeProp>`
    ${tw` p-10 h-full`}

    background-color: ${(p): string => p.theme.colors.gray[200]};
`;

interface AppContainerProps {
    children: ReactNode;
}

const AppContainer = (props: AppContainerProps): JSX.Element => {
    return (
        <>
            <Navigation />
            <AppContainerStyles>{props.children}</AppContainerStyles>
        </>
    );
};

export { AppContainer as default };
