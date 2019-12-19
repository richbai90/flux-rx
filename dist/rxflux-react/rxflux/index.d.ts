import { BehaviorSubject } from "rxjs";
/**
 * State: The portion of the store that is required to render a component
 * Store: The collection of the entire Application state
 * Action: Indicates what action is to take place
 * Reducer: Respond to action and update its portion of the store
 *
 * Store is a collection of states
 * State is a collection of Behavior Subjects
 */
export declare type State<T> = Map<string, BehaviorSubject<T>>;
export declare type Store = Map<Reducer<any>, State<any>>;
export declare type Reducer<T> = (action: Action, state: State<T>) => State<T>;
export declare type Selector<T> = (state: State<T>) => BehaviorSubject<T> | undefined;
export declare type Dispatcher = BehaviorSubject<Action>;
export declare type StoreMap = Map<string, Reducer<any>>;
export interface Action {
    type: symbol;
    payload?: any;
}
export interface ReducerMap {
    [p: string]: Reducer<any>;
}
export declare function createDefaultState<T>(key: string, value: T): State<T>;
export declare function combineReducers(reducers: ReducerMap): {
    store: Map<Reducer<any>, Map<string, BehaviorSubject<any>>>;
    storeMap: Map<string, Reducer<any>>;
    dispatcher: BehaviorSubject<Action>;
};
export declare function selectFromStore<T>(store: Store, storeMap: StoreMap, from: string, selector: Selector<T>): BehaviorSubject<T> | undefined;
//# sourceMappingURL=index.d.ts.map