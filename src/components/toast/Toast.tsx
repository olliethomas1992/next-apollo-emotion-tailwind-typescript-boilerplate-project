import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

import ToastStyles from './ToastStyles';

const Toaster = (): JSX.Element => {
    return (
        <Fragment>
            <ToastStyles />
            <ToastContainer
                position="top-right"
                newestOnTop={false}
                rtl={false}
                autoClose={3000}
            />
        </Fragment>
    );
};

export { Toaster as default };
