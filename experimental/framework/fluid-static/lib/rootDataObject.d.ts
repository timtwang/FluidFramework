/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { BaseContainerRuntimeFactory, DataObject } from "@fluidframework/aqueduct";
import { IContainerRuntime } from "@fluidframework/container-runtime-definitions";
import { IFluidLoadable } from "@fluidframework/core-interfaces";
import { ContainerSchema, LoadableObjectClass, LoadableObjectClassRecord, LoadableObjectRecord } from "./types";
export interface RootDataObjectProps {
    initialObjects: LoadableObjectClassRecord;
}
export declare class RootDataObject extends DataObject<{}, RootDataObjectProps> {
    private readonly initialObjectsDirKey;
    private readonly _initialObjects;
    private get initialObjectsDir();
    protected initializingFirstTime(props: RootDataObjectProps): Promise<void>;
    protected hasInitialized(): Promise<void>;
    get initialObjects(): LoadableObjectRecord;
    create<T extends IFluidLoadable>(objectClass: LoadableObjectClass<T>): Promise<T>;
    private createDataObject;
    private createSharedObject;
}
/**
 * The DOProviderContainerRuntimeFactory is the container code for our scenario.
 *
 * By including the createRequestHandler, we can create any droplet types we include in the registry on-demand.
 * These can then be retrieved via container.request("/dataObjectId").
 */
export declare class DOProviderContainerRuntimeFactory extends BaseContainerRuntimeFactory {
    private readonly rootDataObjectFactory;
    private readonly initialObjects;
    constructor(schema: ContainerSchema);
    protected containerInitializingFirstTime(runtime: IContainerRuntime): Promise<void>;
}
//# sourceMappingURL=rootDataObject.d.ts.map