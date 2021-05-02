import React from "react";
import Routes from "./Routes";

import { createClient } from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Tractor } from "@aircall/tractor";
import { BrowserRouter as Router } from "react-router-dom";

const client = createClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Tractor injectStyle>
        <Router>
          <Routes />
        </Router>
      </Tractor>
    </ApolloProvider>
  );
}

export default App;
