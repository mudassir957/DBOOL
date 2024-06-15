import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => {

  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handelAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handelAuthenticated(authClient);
      }
    });
  }
}

async function handelAuthenticated(authClient) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();