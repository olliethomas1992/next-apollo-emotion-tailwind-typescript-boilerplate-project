import React, { ReactNode } from 'react';

interface ErrorProps {
    error: {};
    children?: ReactNode;
}

const Error = (props: ErrorProps): JSX.Element => {
    console.log(props.error);
    return <p>{props.children}</p>;
};

export { Error as default };
