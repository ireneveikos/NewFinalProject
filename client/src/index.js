import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider, User} from "@auth0/auth0-react";
import { UserProvider } from './UserContext';


const domain = "dev-59x37554.us.auth0.com";
const clientId = "PQNH1iuaQ6H1kG2RjVZcSIRuet0kucDO";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <UserProvider>
        <App />
    </UserProvider>
    </Auth0Provider>
);
