import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Users from "./components/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
