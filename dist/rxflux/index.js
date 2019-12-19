'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rxjs = require('rxjs');

function createDefaultState(key, value) {
    const defaultState = new Map();
    const defaultValue = new rxjs.BehaviorSubject(value);
    return defaultState.set(key, defaultValue);
}
function combineReducers(reducers) {
    const store = new Map();
    const storeMap = new Map();
    Object.keys(reducers).forEach(name => {
        storeMap.set(name, reducers[name]);
        store.set(reducers[name], new Map());
    });
    const dispatcher = createDispatcher(store);
    return { store, storeMap, dispatcher };
}
function selectFromStore(store, storeMap, from, selector) {
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
function createDispatcher(store) {
    const dispatcher = new rxjs.BehaviorSubject({
        type: Symbol("INITIAL_DISPATCH")
    });
    dispatcher.subscribe(action => {
        store.forEach((state, reducer) => {
            store.set(reducer, reducer(action, state));
        });
    });
    return dispatcher;
}

exports.combineReducers = combineReducers;
exports.createDefaultState = createDefaultState;
exports.selectFromStore = selectFromStore;
