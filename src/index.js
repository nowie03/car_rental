import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Login/Login";
import reportWebVitals from "./reportWebVitals";

//next ui imports
import { NextUIProvider } from "@nextui-org/react";

//prime react
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import Car from "./Car";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  split,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Signup from "./Login/Signup";
import RouteGuard from "./RouteGuard";

const router = createBrowserRouter([
  {
  path:"/",
  element:<RouteGuard/>,
  children:[{
    path:"",
    element:<App/>
  }]
  },
  {
    // path: "/",
    // element: <App />,
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/signup",
    element:<Signup/>
  }
]);

const httpLink = new HttpLink({
  uri: 'http://localhost:5213/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5213/graphql',
  options: {
    reconnect: true, // Enable automatic reconnection
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
  credentials: 'include'
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
  <NextUIProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </NextUIProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
