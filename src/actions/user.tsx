import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        currentUser {
            id
            name
            email
            permissions
        }
    }
`;

export { CURRENT_USER_QUERY };
