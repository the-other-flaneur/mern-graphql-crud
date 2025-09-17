# MERN GraphQL CRUD Application

A modern, full-stack CRUD application built with the MERN stack and GraphQL.

This application showcases a complete full-stack implementation using MongoDB, Express.js, React, and Node.js with GraphQL as the API layer. It demonstrates modern web development practices, efficient data fetching, and scalable application architecture.

- **GraphQL API** - Single endpoint with flexible data querying
- **Complete CRUD Operations** - Create, Read, Update, Delete functionality
- **React Frontend** - Modern, component-based user interface
- **MongoDB Database** - Flexible NoSQL data storage
- **Apollo Integration** - Efficient state management and caching
- **Error Handling** - Comprehensive error management system
- **Responsive Design** - Mobile-friendly interface
- **RESTful Principles** - Clean API architecture

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **GraphQL** - Query language and runtime for APIs
- **Apollo Server** - GraphQL server implementation
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React** - Component-based UI library
- **Apollo Client** - GraphQL client with caching
- **React Hooks** - Modern state management
- **CSS3** - Styling and responsive design

### Development Tools
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple npm scripts
- **ESLint** - Code linting and formatting

## Architecture Overview

```
mern-graphql-crud/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── graphql/        # GraphQL queries & mutations
│   │   └── utils/          # Utility functions
├── server/                 # Node.js backend
│   ├── models/             # MongoDB schemas
│   ├── graphql/            # GraphQL schema & resolvers
│   │   ├── typeDefs.js     # GraphQL type definitions
│   │   └── resolvers.js    # GraphQL resolvers
│   ├── config/             # Database configuration
│   └── middleware/         # Express middleware
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/the-other-flaneur/mern-graphql-crud.git
cd mern-graphql-crud
```

2. **Install dependencies:**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Environment Setup:**
```bash
# Create .env file in root directory
echo "MONGODB_URI=mongodb://localhost:27017/mern-graphql-crud" > .env
echo "PORT=5000" >> .env
```

4. **Start the application:**
```bash
# Development mode (runs both client and server)
npm run dev

# Or run separately:
npm run server    # Backend only
npm run client    # Frontend only
```

5. **Access the application:**
- Frontend: `http://localhost:3000`
- GraphQL Playground: `http://localhost:5000/graphql`

## 📋 API Documentation

### GraphQL Schema

#### Types
```graphql
type Item {
  id: ID!
  name: String!
  description: String
  category: String!
  price: Float
  createdAt: String!
  updatedAt: String!
}

type Query {
  getItems: [Item!]!
  getItem(id: ID!): Item
  getItemsByCategory(category: String!): [Item!]!
}

type Mutation {
  createItem(input: ItemInput!): Item!
  updateItem(id: ID!, input: ItemInput!): Item!
  deleteItem(id: ID!): String!
}
```

#### Example Queries

**Fetch All Items:**
```graphql
query GetItems {
  getItems {
    id
    name
    description
    category
    price
    createdAt
  }
}
```

**Create New Item:**
```graphql
mutation CreateItem($input: ItemInput!) {
  createItem(input: $input) {
    id
    name
    description
    category
    price
  }
}
```

## Key Implementation Details

### GraphQL Resolvers
- **Query Resolvers** - Efficient data fetching with filtering options
- **Mutation Resolvers** - Create, update, and delete operations
- **Error Handling** - Comprehensive validation and error responses
- **Database Integration** - Mongoose ODM for MongoDB operations

### React Components
- **Functional Components** - Modern React with hooks
- **Apollo Client Integration** - Efficient state management
- **Real-time Updates** - Optimistic updates and cache management
- **Form Handling** - Controlled components with validation

## Learning Outcomes

### Backend Development
- **GraphQL Schema Design** - Type-safe API development
- **Database Modeling** - MongoDB schema design with Mongoose
- **Server Architecture** - Scalable Node.js/Express setup
- **API Security** - Input validation and error handling

### Frontend Development
- **Modern React Patterns** - Hooks, context, and component composition
- **State Management** - Apollo Client for GraphQL state
- **UI/UX Design** - Responsive and intuitive interfaces
- **Performance Optimization** - Efficient rendering and data fetching

### Full-Stack Integration
- **End-to-End Development** - Complete application lifecycle
- **Real-time Communication** - GraphQL subscriptions ready
- **Development Workflow** - Modern tooling and best practices
- **Deployment Preparation** - Production-ready configuration

Built with ❤️ as part of my Computer Science journey | [View Portfolio](https://theotherflaneur.vercel.app/)
