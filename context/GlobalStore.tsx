import {
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from 'react';
import { initialState } from './initialState';
import { ActionInterface, ActionTypes, reducer } from './reducer';

interface GlobalContextType {
  state: typeof initialState;
  dispatch: Dispatch<ActionInterface>;
}

export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => initialState,
});

export const useGlobalStore = () => useContext(GlobalContext);

type GlobalStoreProps = {};

export const GlobalStore: FC<PropsWithChildren<GlobalStoreProps>> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      const res = await fetch('http://localhost:5000/filters');
      const data = await res.json();
      const { searchFilter } = data || {};
      const { brands, categories } = searchFilter || {};

      dispatch({ type: ActionTypes.setCategories, payload: categories });
      dispatch({ type: ActionTypes.setBrands, payload: brands });
    };
    init();
  }, []);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
