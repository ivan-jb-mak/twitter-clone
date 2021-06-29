// Library imports
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setContext } from "apollo-link-context";

// Components
import Users from "./components/Users";
import Landing from "./pages/landing/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import IsAuthenticated from "./components/IsAuthenticated";
import Profile from "./pages/Profile";
import SingleTweet from "./pages/SingleTweet";
import SingleUser from "./pages/SingleUser";

//CSS
import "./App.css";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          {/* <Route path="/signup">
            <Signup />
          </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <IsAuthenticated>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/tweet/:id">
              <SingleTweet />
            </Route>
            <Route path="/user/:id">
              <SingleUser />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
