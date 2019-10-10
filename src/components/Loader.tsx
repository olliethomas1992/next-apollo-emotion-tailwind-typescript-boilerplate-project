import styled from '@emotion/styled';
import React from 'react';

import { ThemeProp } from '../theme';

const LoaderStyles = styled.div<ThemeProp>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: -2.5rem;

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid ${(p): string => p.theme.colors.primary};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${(p): string => p.theme.colors.primary} transparent
            transparent transparent;
    }
    .lds-ring div:nth-of-type(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-of-type(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-of-type(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader = (): JSX.Element => {
    return (
        <LoaderStyles>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderStyles>
    );
};

export { Loader as default };
