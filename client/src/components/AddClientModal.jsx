/*
    usign a modal, you could use react router and have another page 
    or embed the form into the clients pages
*/

import { useState } from "react";
import { FaUser} from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone ] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        // use the cache aggain nstead of refetching
        update(cache, { data: { addClient } }) {  // gives back  whatever whe return from add client
            const { clients } = cache.readQuery({ // read from the cache
                query:GET_CLIENTS }); // from this query
            
            cache.writeQuery({ // write to the clients
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient]}, // concat the new client onto the current clients or could use spread operator "[...clients, addClient]" 
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        
        // some validation of imnput 
        if(name === "" || email === "" || phone === "") {
            return alert('Please fill in all fields');
        }

        // call add clietn and pass from the state
        addClient(name, email, phone);

        // clear the form
        setName('');
        setEmail('');
        setPhone('');
    };

  return (
    <>
        <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-toggle="modal" 
            data-bs-target="#addClientModal"
        >
            <div className="d-flex align-items-center">
                <FaUser className="icon" />
                <div>Add Client</div>
            </div>
        </button>   

        <div 
            className="modal fade" 
            id="addClientModal" 
            aria-labelledby="addClientModalLabel" 
            aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 
                        className="modal-title" 
                        id="addClientModalLabel"
                    >Add Client
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
                            <label className="form-label">Email</label>
                            <input 
                                className="form-control" 
                                type="email"
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input 
                                className="form-control" 
                                type="text"
                                id="phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}
