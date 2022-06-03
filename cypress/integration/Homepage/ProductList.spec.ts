describe('Product List', () => {
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

    // mocking server side generated data
    cy.task('nock', {
      hostname: 'http://localhost:5000',
      method: 'GET',
      path: '/products',
      statusCode: 200,
      body: {
        products: [
          {
            id: '1',
            title: 'Some Product',
            description: 'some description',
            price: '1000',
            category: 'category name',
            image: 'https://placeimg.com/500/500',
            rating: {
              rate: '4',
              count: '5',
            },
          },
        ],
      },
    });

    cy.visit('/');
  });

  it.only('should render product card with all its components', () => {
    cy.get('[data-testid=product-card]').as('productCard');
    cy.get('@productCard').should('have.length', 1);
    // image
    cy.get('@productCard')
      .get('img')
      .should('have.attr', 'alt', "Some Product's image");
    // productName
    cy.get('@productCard')
      .contains('p', /some product/i)
      .should('be.visible');
    // productDescription
    cy.get('@productCard')
      .contains('p', /some description/i)
      .should('be.visible');

    // productPrice
    cy.get('@productCard').contains('1000').should('be.visible');

    // Add to cart button
    cy.get('@productCard')
      .contains('button', /add to cart/i)
      .should('be.visible');
  });
});

export {};
