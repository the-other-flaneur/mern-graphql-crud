import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

// bring stuff to work with apollo 
import {
  ApolloProvider, 
  ApolloClient,
  InMemoryCache, // to store some  thing in cache and dont wait page to load
} from '@apollo/client';

// to solve the warning generated for using the cache
const cache = new InMemoryCache({
  typePolicies: { // create a type policies objects
    Query: {  // a query objects
      fields: {
        clients: {
          merge(existing, incoming) { // usign a merge function
            return incoming; 
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({ // create the client
  uri: 'http://localhost:5000/graphql',
  cache, // new InMemoryCache(), siwtch to only cache to solve the warning above
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/Projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
