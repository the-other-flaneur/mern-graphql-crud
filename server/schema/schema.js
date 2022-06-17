const { projects, clients } = require('../sampleData.js') //use data from a file to start and make tries, destructure from th e file

// bring in mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

const { GraphQLObjectType,
     GraphQLID,
      GraphQLString,
      GraphQLList,
      GraphQLNonNull, // ensure users cannot mutate with null values
      GraphQLEnumType, // let us specify a range of values that it could be
      GraphQLSchema,
      GraphQLScalarType} = require('graphql'); // bring things from graphql destructuring

// project type
const ProjectType = new GraphQLObjectType({
    name: 'Project', // name 
    fields: () => ({ // function that retuns an object
        id: { type: GraphQLID }, // use the graphql id type
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { // make a relation betwen the project ad the client
            type: ClientType,
            resolve(parent, args) {
                // return clients.find(client => client.id === parent.clentId);
                return Client.findById(parent.clientId);
            },
        },
    }),
});

// client type
const ClientType = new GraphQLObjectType({
    name: 'Client', // name 
    fields: () => ({ // function that retuns an object
        id: { type: GraphQLID }, // use the graphql id type
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// root query
const RootQuery = new GraphQLObjectType({ // to make a query
    name: 'RootQueryType',
    fields: { // objects
        projects: { // list of client types
            type: new GraphQLList(ProjectType),
            resolve(parent,args) {
                // return projects; instead of doing this and bringing the array from the file 
                // connect to database
                return Project.find()
            },
        },
        project: { // to fetch a client object
            type: ProjectType,
            args: { id: {type: GraphQLID } }, // to know wich client are we fetching
            resolve(parent, args) {
                // return projects.find(project => project.id === project.id); // as we are dealing with a single file, loops the array and fin the client that has the same id
                // same as before use databse instead
                return Project.findById(args.id);
            } 
        },
        clients: { // list of client types
            type: new GraphQLList(ClientType),
            resolve(parent,args) {
                // return clients;
                return Client.find()
            },
        },
        client: { // to fetch a client object
            type: ClientType,
            args: { id: {type: GraphQLID } }, // to know wich client are we fetching
            resolve(parent, args) {
                //return clients.find(client => client.id === args.id); // as we are dealing with a single file, loops the array and fin the client that has the same id
                return Client.findById(args.id);
            }, 
        }
    }
});

// mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a Client to the database
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)},
                phone: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) { 
                const client = new Client({ // creating a new client usign themongoose model
                    name: args.name,    // passign the values or props from graphql(form form the frontend)
                    email: args.email,
                    phone: args.phone,
                });

                return client.save(); // save it to the database (also is a create method)
            },
        },
        // Remove a Client from the database
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach(project => {
                        project.remove();  // remove each  project assosiated with that client
                    });
                });

                return Client.findByIdAndRemove(args.id);
            }
        },
        // Add a project 
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus', // name that nees to be unique
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type : GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },
        //  delete project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            },
        },
        // update project 
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: {type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate', // name that nees to be unique
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
    },
});

module.exports = new GraphQLSchema({ // to use the query we have to export tis as a schema
    query: RootQuery,
    mutation
})