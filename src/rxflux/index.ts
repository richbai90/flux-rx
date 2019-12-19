import { BehaviorSubject, Observable } from "rxjs";
/**
 * State: The portion of the store that is required to render a component
 * Store: The collection of the entire Application state
 * Action: Indicates what action is to take place
 * Reducer: Respond to action and update its portion of the store
 *
 * Store is a collection of states
 * State is a collection of Behavior Subjects
 */

export type State<T> = Map<string, BehaviorSubject<T>>;
export type Store = Map<Reducer<any>, State<any>>;
export type Reducer<T> = (action: Action, state: State<T>) => State<T>;
export type Selector<T> = (state: State<T>) => BehaviorSubject<T> | undefined;
export type Dispatcher = BehaviorSubject<Action>;
export type StoreMap = Map<string, Reducer<any>>;
export interface Action {
  type: symbol;
  payload?: any;
}
export interface ReducerMap {
  [p: string]: Reducer<any>;
}

export function createDefaultState<T>(key : string, value : T) : State<T> {
  const defaultState : State<T> = new Map();
  const defaultValue = new BehaviorSubject(value);
  return defaultState.set(key, defaultValue);
}

export function combineReducers(reducers: ReducerMap) {
  const store: Store = new Map();
  const storeMap: StoreMap = new Map();
  Object.keys(reducers).forEach(name => {
    storeMap.set(name, reducers[name]);
    store.set(reducers[name], new Map());
  });

  const dispatcher = createDispatcher(store);

  return { store, storeMap, dispatcher };
}

export function selectFromStore<T>(
  store: Store,
  storeMap: StoreMap,
  from: string,
  selector: Selector<T>
) {
  const reducer = storeMap.get(from);
  if (!reducer) {
    throw `No Registered Reducer ${from} to get`;
  }
  const state = store.get(reducer);
  if (!state) {
    throw `No state registered in the store for ${from}`;
  }
  return selector(state);
}

function createDispatcher(store: Store) {
      const dispatcher : Dispatcher = new BehaviorSubject({
        type: Symbol("INITIAL_DISPATCH")
      });
      dispatcher.subscribe(action => {
        store.forEach((state, reducer) => {
          store.set(reducer, reducer(action, state));
        });
      });
      return dispatcher;
    }
