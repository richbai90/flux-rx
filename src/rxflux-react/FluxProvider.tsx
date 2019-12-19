import React, { ReactChildren } from "react";
import {FluxContext as Context} from "./FluxContext";
import { Store, StoreMap, Dispatcher } from "../rxflux";

export type ProviderComponent = React.FC<{
  store: Store;
  storeMap: StoreMap;
  dispatcher: Dispatcher;
}>;
export const Provider: ProviderComponent = ({ children, ...rest }) => (
  <Context.Provider value={rest}>{children}</Context.Provider>
);
