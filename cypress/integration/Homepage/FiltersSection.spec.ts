describe('Filters Section', () => {
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
            {
              ID: '1',
              name: 'Hello',
              subCategories: [{ ID: '3', name: 'subCat', subCategories: [] }],
            },
            { ID: '2', name: 'World', subCategories: [] },
          ],
          brands: [
            { ID: '1', name: 'Linkedin' },
            { ID: '2', name: 'Reddit' },
          ],
        },
      }
    ).as('categories');

    cy.visit('/');
  });

  it('selects different brands and apply them', () => {
    cy.contains(/linkedin/i).click();
    cy.contains(/reddit/i).click();
    cy.contains('button', /apply/i).click();

    const testString = 'brands=' + encodeURIComponent('Linkedin,Reddit');
    cy.url().should('include', testString);
  });

  it('selects brands from url', () => {
    cy.visit('/?brands=Linkedin,Reddit');

    cy.contains(/linkedin/i)
      .get('input')
      .should('be.checked');

    cy.contains(/reddit/i)
      .get('input')
      .should('be.checked');
  });

  it.only('selects a category and apply them', () => {
    cy.contains(/subcat/i).click();
    cy.contains('button', /apply/i).click();

    cy.url().should(
      'include',
      encodeURIComponent(JSON.stringify({ Hello: ['subCat'] }))
    );
  });
});

export {};
