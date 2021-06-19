// Library imports
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Users from "./components/Users";
import Landing from "./components/Users";

//CSS
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/">
            <Users />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
