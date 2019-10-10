import css, { SerializedStyles } from '@emotion/css';
import emotionNormalize from 'emotion-normalize';

import { Theme } from '../theme';

const globalStyles = (theme: Theme): SerializedStyles => css`
    ${emotionNormalize}
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    html {
        box-sizing: border-box;
        font-size: 16px;
        height: 100%;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    body {
        font-size: ${theme.fontSize.base};
        line-height: ${theme.lineHeight.normal};
        font-family: 'Roboto', sans-serif;
        height: 100%;
        color: ${theme.colors.gray[700]};
    }
    a {
        text-decoration: none;
        color: ${theme.colors.gray[700]};
    }
    button {
        cursor: pointer;
    }

    #__next {
        height: 100%;
    }
`;

export { globalStyles };
