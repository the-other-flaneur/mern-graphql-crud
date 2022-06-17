import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectsQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm( { project }) {

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    })
    
    const onSubmit = (e) => { 
        if( !name || !description || !status ) {
            return alert('Please fill out all the fields');
        }

        updateProject(name, description, status);
     }

    return (
    <div>
        <h3>Update Project Details</h3>
        <form onSubmit={ onSubmit }>
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

            <button type='submit' className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
  )
}
