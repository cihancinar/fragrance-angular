import {KeycloakConfig} from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'sqli',
  clientId: 'frontend',
};

export default keycloakConfig;
