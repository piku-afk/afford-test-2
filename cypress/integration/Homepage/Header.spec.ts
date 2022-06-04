describe('Header', () => {
  beforeEach(() => {
    cy.task('clearNock');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:5000/filters',
      },
      {
        searchFilter: {
          categories: [
            { ID: '1', name: 'Hello', subCategories: [] },
            { ID: '2', name: 'World', subCategories: [] },
          ],
          brands: [],
        },
      }
    ).as('categories');

    cy.visit('/');
  });

  it('renders a heading', () => {
    cy.get('header p').contains('Sample Ecom').should('be.visible');
  });

  it('renders all category button', () => {
    cy.contains('button', /all categories/i)
      .should('be.visible')
      .click();
    cy.get('[role="presentation"]').get('li').should('have.length', 2);
    cy.contains('li[role=menuitem]', /hello/i).should('be.visible');
    cy.contains('li[role=menuitem]', /world/i).should('be.visible').click();

    cy.get('[role=presentation]').should('not.exist');
  });

  it('renders a search field', () => {
    cy.get('input[name="search"]')
      .should('have.value', '')
      .type('hello')
      .should('have.value', 'hello');
  });

  it('renders two buttons for profile and cart', () => {
    cy.get('[aria-label=Profile]').should('be.visible');
    cy.get('[aria-label=Cart]').should('be.visible');
  });
});

export {};
