import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
    mutation LOGOUT_MUTATION {
        logout {
            message
        }
    }
`;

export { LOGOUT_MUTATION };
