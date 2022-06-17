import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_PROJECTS } from '../queries/projectsQueries'

/* to make the delete resolve in the foont you have two options refetch the queries
or update the cache */
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({ client }) {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries:[{query: GET_CLIENTS}],
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        /*update(cache, { data: {deleteClient} }) { // function, passsing cache and saving the data to the response of the delete client mutation
            const { clients } = cache.readQuery({ // get the query from the cash and not fetch the data again
                query: GET_CLIENTS });
            cache.writeQuery({ // write to the cache 
                query:GET_CLIENTS,
                data: { clients: clients.filter(client => // setting the data to the clients but not the deleted client
                    client.id !== deleteClient.id) },
            });
        }*/
    })

  return (
    <tr>
        <td>{ client.name }</td>
        <td>{ client.email }</td>
        <td>{ client.phone }</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
