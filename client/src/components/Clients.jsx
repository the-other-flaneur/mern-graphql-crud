
// temporal use the query in the component then move them to his own component
import {
    // gql, to make the query (used in client mutations)
    useQuery, // use the query in the component , the loading state and the errors, its a hook
} from '@apollo/client';

import Spinner from './Spinner';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS); // usign apollo and apollo provider is it's own state manager 
        
    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
            { !loading && !error && (

                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.clients.map(client => {
                            return <ClientRow key={client.id} client={client} /> // separate component instead of row
                        })}
                    </tbody>
                </table>
            ) }
        </>
    )
}