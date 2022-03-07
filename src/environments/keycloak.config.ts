import {KeycloakConfig} from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: '/auth',
  realm: 'sqli',
  clientId: 'frontend',
};

export default keycloakConfig;
