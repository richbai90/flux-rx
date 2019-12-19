import { Selector, selectFromStore } from "../rxflux";
import { useState, useContext } from "react";
import {FluxContext} from "./FluxContext";

export function useSelector<T>(from: string, selector: Selector<T>) {
  const context = useContext(FluxContext);
  const [selectedState, setSelectedState] = useState();
  if (context) {
    const { store, storeMap } = context;
    const selection$ = selectFromStore(store, storeMap, from, selector)
    if(!selection$) {
     return;
    }
    selection$.subscribe(v => setSelectedState(v));
    return selectedState;
  }

  return;
}
