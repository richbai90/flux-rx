import {FluxContext} from './FluxContext';
import { useContext } from 'react';

export function useDispatcher() {
    const context = useContext(FluxContext);
    if(context) {
        return context.dispatcher
    }

    throw 'Context not registerd. Did your forget to use a Provider?'
}