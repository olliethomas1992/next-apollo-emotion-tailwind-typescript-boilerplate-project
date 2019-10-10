import React, { ReactNode } from 'react';

import SignUp from '../containers/SignUp';
import { withApollo } from '../lib/withApollo';

const SignUpPage = (): ReactNode => {
    return <SignUp />;
};

export default withApollo(SignUpPage);
