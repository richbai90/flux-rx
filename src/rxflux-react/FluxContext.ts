import { createContext, Context } from "react";
import {Store, StoreMap, Dispatcher} from '../rxflux';

export const FluxContext = createContext(null) as Context<null | {store: Store, storeMap: StoreMap, dispatcher : Dispatcher}>;