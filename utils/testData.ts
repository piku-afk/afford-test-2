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
