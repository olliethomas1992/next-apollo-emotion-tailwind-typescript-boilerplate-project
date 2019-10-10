import React, { ReactNode } from 'react';

import Auth from '../components/Auth';
import Users from '../containers/Users';
import { withApollo } from '../lib/withApollo';

const UsersPage = (): ReactNode => {
    return (
        <Auth>
            <Users />
        </Auth>
    );
};

export default withApollo(UsersPage);
