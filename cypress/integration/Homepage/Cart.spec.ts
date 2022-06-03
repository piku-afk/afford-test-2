describe('Cart', () => {
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

  it('renders a cart popup', () => {
    cy.get('[aria-label=Cart]').click();

    cy.contains('h6', /shopping cart/i).should('be.visible');
    cy.contains('p', /empty cart/i).should('be.visible');
    cy.contains('p', /continue shopping/i).should('be.visible');
    cy.contains('button', /go to checkout/i).should('be.visible');

    cy.get('[aria-label=close-cart]').click();
    cy.contains('h6', /shopping cart/i).should('not.exist');
  });

  it('renders product count on cart icon', () => {
    cy.contains('button', /add to cart/i)
      .first()
      .click();
    cy.contains('span', '1').should('be.visible');
  });

  it('should add and remove product in cart', () => {
    // adding to cart
    cy.contains('button', /add to cart/i).click();
    cy.get('[aria-label=Cart]').click();
    cy.get('#show-cart')
      .contains('p', /some product/i)
      .should('be.visible');

    // removing from cart
    cy.get('#show-cart')
      .contains('button', /remove/i)
      .click();
    cy.get('#show-cart')
      .contains('p', /some product/i)
      .should('not.exist');
    cy.get('[aria-label=close-cart]').click();
    cy.contains('span', '1').should('not.exist');
  });
});

export {};
