/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { TypedEventEmitter } from "@fluidframework/common-utils";
import { Container } from "@fluidframework/container-loader";
import { IFluidLoadable } from "@fluidframework/core-interfaces";
import { IEvent, IEventProvider } from "@fluidframework/common-definitions";
import { IAudience } from "@fluidframework/container-definitions";
import { LoadableObjectClass, LoadableObjectRecord } from "./types";
import { RootDataObject } from "./rootDataObject";
export interface IFluidContainerEvents extends IEvent {
    (event: "connected" | "dispose" | "disconnected", listener: () => void): void;
}
export interface IFluidContainer extends IEventProvider<IFluidContainerEvents> {
    readonly disposed: boolean;
    readonly connected: boolean;
    readonly initialObjects: LoadableObjectRecord;
    create<T extends IFluidLoadable>(objectClass: LoadableObjectClass<T>): Promise<T>;
    dispose(): void;
}
export declare class FluidContainer extends TypedEventEmitter<IFluidContainerEvents> implements IFluidContainer {
    private readonly container;
    private readonly rootDataObject;
    private readonly connectedHandler;
    private readonly disconnectedHandler;
    private readonly disposedHandler;
    constructor(container: Container, rootDataObject: RootDataObject);
    get disposed(): boolean;
    get connected(): boolean;
    get initialObjects(): Record<string, IFluidLoadable>;
    /**
    * @deprecated - Audience is being moved to the client packages
    */
    get audience(): IAudience;
    /**
    * @deprecated - clientId is being moved to the client packages
    */
    get clientId(): string | undefined;
    create<T extends IFluidLoadable>(objectClass: LoadableObjectClass<T>): Promise<T>;
    dispose(): void;
}
//# sourceMappingURL=fluidContainer.d.ts.map