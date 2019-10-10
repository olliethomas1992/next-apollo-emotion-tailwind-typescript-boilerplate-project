import React, { ReactNode } from 'react';

import Login from '../containers/Login';
import { withApollo } from '../lib/withApollo';

const LoginPage = (): ReactNode => {
    return <Login />;
};

export default withApollo(LoginPage);
