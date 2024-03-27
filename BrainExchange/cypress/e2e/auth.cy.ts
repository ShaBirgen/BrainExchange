describe('Testing sigup functionality using fixtures', () => {
  let data: {
    Username: string;
    Email: string;
    Phone_number: string;
    Password: string;
  };
  before(() => {
    cy.fixture('register').then((info) => {
      data = info;
    });
  });
  it('registers a user', () => {
    cy.visit('http://localhost:4200/register');
    cy.get('[data-cy="Username"]').type(data.Username);
    cy.get('[data-cy="email-input"]').type(data.Email);
    cy.get('[data-cy="phone_number-input"]').type(data.Phone_number);
    cy.get('[data-cy="password-input"]').type(data.Password);
    cy.get('[data-cy="create-account-link"]')
      .click()
      .then((el) => {
        cy.wait(1000);
        cy.visit('http://localhost:4200/role/4567856898');
        cy.location('pathname').should('not.equal', '/register');
        cy.location('pathname').should('equal', '/role/4567856898');
      });
    // });
  });
});

describe('Sending requests to register user using fixtures', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.intercept('POST', ' POST http://localhost:3000/users/register', {
      body: {
        message: 'User registered successfully',
      },
    }).as('RegisterRequest');
  });

  it('Post request handling', () => {

    cy.get('.submit').click();

    cy.wait('@RegisterRequest', { requestTimeout: 10000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
      }
    );
  });
});

describe('Testing login functionality', () => {
  let data: { email: string; password: string };

  before(() => {
    cy.fixture('login').then((info) => {
      data = info;
    });
  });

  it('Login user using fixture data', () => {
    cy.visit('/login');

    cy.fixture('login.json').then((data) => {
      cy.get('[data-cy="email-link"]').type(data.email);
      cy.get('[data-cy="password-link"]').type(data.password);
      cy.get('[data-cy="submit-btn"]')
        .click()
        .then((el) => {
          cy.wait(1000);
          cy.visit('');
          cy.location('pathname').should('not.equal', '/login');
        });
    });
  });
});

describe('Sending login requests without hitting the backend', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.intercept('POST', ' http://localhost:4200/users/login', {
      body: {
        message: 'Logged in successfully',
      },
    }).as('RequestToLogin');
  });

  it('Sends login requests without hitting the backend', () => {
    cy.get('[data-cy="submit-btn"]').click();

    cy.wait('@RequestToLogin', { requestTimeout: 5000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
      }
    );
  });
});
