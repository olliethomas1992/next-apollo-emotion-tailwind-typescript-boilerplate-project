import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { ThemeProp } from '../../theme';

const FormCard = styled.div<ThemeProp>`
    ${tw` bg-white p-4 rounded-lg border border-gray-500 shadow-sm m-auto`};

    @media (min-width: ${(p): string => p.theme.screens.md}) {
        width: 50%;
        min-width: ${(p): string => p.theme.screens.sm};
    }
`;

export { FormCard };
