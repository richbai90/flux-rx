'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
require('rxjs');

const FluxContext = React.createContext(null);

const Provider = ({ children, ...rest }) => (React__default.createElement(FluxContext.Provider, { value: rest }, children));

function useDispatcher() {
    const context = React.useContext(FluxContext);
    if (context) {
        return context.dispatcher;
    }
    throw 'Context not registerd. Did your forget to use a Provider?';
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

function useSelector(from, selector) {
    const context = React.useContext(FluxContext);
    const [selectedState, setSelectedState] = React.useState();
    if (context) {
        const { store, storeMap } = context;
        const selection$ = selectFromStore(store, storeMap, from, selector);
        if (!selection$) {
            throw "Nothing returned from selector";
        }
        selection$.subscribe(v => setSelectedState(v));
        return selectedState;
    }
    throw "Context not registerd. Did your forget to use a Provider?";
}

exports.FluxContext = FluxContext;
exports.Provider = Provider;
exports.useDispatcher = useDispatcher;
exports.useSelector = useSelector;
