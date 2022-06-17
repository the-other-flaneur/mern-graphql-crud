/*
    usign a modal, you could use react router and have another page 
    or embed the form into the clients pages
*/

import { useState } from "react";
import { FaList} from 'react-icons/fa';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectsQueries";
import { GET_CLIENTS } from "../queries/clientQueries"; // to display i the modal

export default function AddProjectModal() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId ] = useState('');
    const [status, setStatus ] = useState('new'); // using enum key

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            });
        },
    })


    // get clients for select menu
    const { loading, error, data } = useQuery(GET_CLIENTS);
    
    const onSubmit = (e) => {
        e.preventDefault();
        
        // some validation of imnput 
        if(name === "" || description === "" || status === "") {
            return alert('Please fill in all fields');
        }

        addProject(name, description, clientId, status);

        // clear the form
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };
    
    // dont render the form if clients are not fetched
    if (loading) return null;
    if (error) return 'Something went wrong';

  return (
    <>
        { !loading  && !error && (
            <>
                <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#addProjectmodal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Project</div>
                </div>
            </button>   

            <div 
                className="modal fade" 
                id="addProjectmodal" 
                aria-labelledby="addProjectmodalLabel" 
                aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 
                            className="modal-title" 
                            id="addProjectmodalLabel"
                        >New Project
                        </h5>
                        <button type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    className="form-control" 
                                    type="text"
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">description</label>
                                <textarea
                                    className="form-control" 
                                    type="text"
                                    id="description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <select 
                                    id="status" 
                                    className="form-select" 
                                    value={status} 
                                    onChange={ (e) => setStatus(e.target.value) } 
                                >
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Client</label>
                                <select 
                                    id="clientId" 
                                    className="form-select" 
                                    value="{clientId}" 
                                    onChange={(e) => setClientId(e.target.value)}    
                                >
                                    <option value=''>Select Client</option>
                                    { data.clients.map((client) => {
                                        return (
                                        <option key={client.id} value={client.id}>  
                                            {client.name}                                  
                                        </option> )
                                    }) }
                                </select>
                            </div>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </>
        )}
    </>
  )
}
