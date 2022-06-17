import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export {GET_CLIENTS }; // not export as default cause we have more than one querie.