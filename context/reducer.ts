import { Category, initialState, Product } from './initialState';

type initialStateType = typeof initialState;

export enum ActionTypes {
  setBrands = 'SET_BRANDS',
  addToCart = 'ADD_TO_CART',
  removeFromCart = 'REMOVE_FROM_CART',
  setCategories = 'SET_CATEGORIES',
}

export type ActionInterface =
  | {
      type: ActionTypes.setBrands;
      payload: [];
    }
  | {
      type: ActionTypes.addToCart;
      payload: Product;
    }
  | {
      type: ActionTypes.removeFromCart;
      payload: Product;
    }
  | {
      type: ActionTypes.setCategories;
      payload: Category[];
    };

export const reducer = (
  state: initialStateType,
  action: ActionInterface
): initialStateType => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.setBrands:
      return { ...state, brands: payload };

    case ActionTypes.addToCart: {
      const { id } = payload;
      const searchIndex = state.cart.findIndex((item) => item.id === id);
      if (searchIndex > -1) {
        const newCart = [
          ...state.cart.slice(0, searchIndex),
          {
            ...state.cart[searchIndex],
            quantity: (state.cart[searchIndex].quantity || 0) + 1,
          },
          ...state.cart.slice(searchIndex + 1),
        ];
        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...state.cart, { ...payload, quantity: 1 }] };
    }

    case ActionTypes.removeFromCart: {
      const { cart } = state;
      const newCart = cart.filter((item) => item.id !== payload.id);
      return { ...state, cart: newCart };
    }

    case ActionTypes.setCategories:
      return { ...state, categories: payload };

    default:
      return state;
  }
};
