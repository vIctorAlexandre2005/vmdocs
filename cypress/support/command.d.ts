// cypress/support/commands.d.ts
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    type RegisterUser = {
      full_name: string;
      login: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    type LoginCreds = {
      username: string;
      password: string;
    };

    interface Chainable {
      /** Fluxo de registro pela UI, esperando 200 */
      register(user: RegisterUser): Chainable<void>;
    }
  }
}

export {};
