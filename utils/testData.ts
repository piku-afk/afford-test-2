import { NextRouter } from 'next/router';

export const mockCategories = [
  {
    ID: '1',
    name: 'Hello',
    subCategories: [
      { ID: '1', name: 'Piyush', subCategories: [] },
      { ID: '2', name: 'Mahato', subCategories: [] },
    ],
  },
  { ID: '2', name: 'World 2', subCategories: [] },
];

export const mockProducts = [
  {
    id: '1',
    title: 'product 1',
    description: 'some description',
    price: '',
    category: '',
    image: 'http://placeimg.com',
    quantity: 1,
    rating: { rate: '', count: '' },
  },
];

export const mockBrands = [
  { ID: '1', name: 'hello' },
  { ID: '2', name: 'world' },
];

export const createMockRouter = (
  mockRouter: Partial<NextRouter>
): NextRouter => {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...mockRouter,
  };
};
