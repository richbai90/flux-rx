import { Context } from "react";
export declare const FluxContext: Context<{
    store: Map<import("../rxflux").Reducer<any>, Map<symbol, import("rxjs").Observable<any>>>;
    storeMap: Map<string, import("../rxflux").Reducer<any>>;
    dispatcher: import("rxjs").BehaviorSubject<import("../rxflux").Action>;
} | null>;
//# sourceMappingURL=FluxContext.d.ts.map