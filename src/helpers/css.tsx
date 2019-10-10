import { css } from '@emotion/core';

import { theme } from '../theme';

export const media: any = Object.keys(theme.screens).reduce(
    (accumulator, label) => {
        const prefix = 'min-width:';
        const suffix = typeof theme.screens[label] === 'string' ? '' : 'px';
        accumulator[label] = cls => css`
            @media (${prefix + theme.screens[label] + suffix}) {
                ${cls}
            }
        `;
        return accumulator;
    },
    {}
);
