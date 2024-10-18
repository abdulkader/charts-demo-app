import { createContext, useReducer } from 'react';
import { SearchPanel } from '@/components/SearchPanel';
import { SearchMode } from '@/lib/enums';

export const SET_SEARCH_OPEN = 'SET_SEARCH_OPEN';
export const LOAD_CHARTS = 'LOAD_CHARTS';
export const ADD_CHART = 'ADD_CHART';
export const REMOVE_CHART = 'REMOVE_CHART';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

export const AppContext = createContext<any>(null);

type AppState = {
  charts: any[];
  searchOpen: boolean;
  searchValue: string;
  searchMode: SearchMode | null;
};

const initialState: AppState = {
  charts: [],
  searchOpen: false,
  searchValue: '',
  searchMode: SearchMode.ADD,
};

const appReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_OPEN:
      return {
        ...state,
        searchOpen: action.payload.open,
        searchMode: action.payload?.mode || SearchMode.ADD,
      };
    case LOAD_CHARTS:
      return { ...state, charts: action.payload };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);
  

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
      <SearchPanel />
    </AppContext.Provider>
  );
};
