import React from "react";
import { Store, StoreMap, Dispatcher } from "../rxflux";
export declare type ProviderComponent = React.FC<{
    store: Store;
    storeMap: StoreMap;
    dispatcher: Dispatcher;
}>;
export declare const Provider: ProviderComponent;
//# sourceMappingURL=FluxProvider.d.ts.map