/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { IErrorEvent } from "@fluidframework/common-definitions";
import { TypedEventEmitter } from "@fluidframework/common-utils";
import { Jsonable } from "@fluidframework/datastore-definitions";
import { IInboundSignalMessage } from "@fluidframework/runtime-definitions";
export declare type SignalListener = (clientId: string, local: boolean, payload: Jsonable) => void;
/**
 * ISignalManager defines an interface for working with signals that is similar to the more common
 * eventing patterns of EventEmitter.  In addition to sending and responding to signals, it
 * provides explicit methods around signal requests to other connected clients.
 */
export interface ISignalManager {
    /**
     * Adds a listener for the specified signal.  It behaves in the same way as EventEmitter's `on`
     * method regarding multiple registrations, callback order, etc.
     * @param signalName - The name of the signal
     * @param listener - The callback signal handler to add
     * @returns This ISignalManager
     */
    onSignal(signalName: string, listener: SignalListener): ISignalManager;
    /**
    * Remove a listener for the specified signal.  It behaves in the same way as EventEmitter's
    * `off` method regarding multiple registrations, removal order, etc.
    * @param signalName - The name of the signal
    * @param listener - The callback signal handler to remove
    * @returns This ISignalManager
    */
    offSignal(signalName: string, listener: SignalListener | ((message: any) => void)): ISignalManager;
    /**
     * Send a signal with payload to its connected listeners.
     * @param signalName - The name of the signal
     * @param payload - The data to send with the signal
     */
    submitSignal(signalName: string, payload?: Jsonable): any;
    /**
     * Adds a listener for a broadcast request.  The listener is called when a client calls
     * `requestBroadcast` for that signal.  It behaves in the same way as EventEmitter's `on`
     * method regarding multiple registrations, callback order, etc.
     * @param signalName - The signal for which broadcast is requested
     * @param listener - The callback for the broadcast request to add
     * @returns This ISignalManager
     */
    onBroadcastRequested(signalName: string, listener: SignalListener): ISignalManager;
    /**
     * Remove a listener for a broadcast request.  It behaves in the same way as EventEmitter's
     * `off` method regarding multiple registrations, removal order, etc.
     * @param signalName  - The signal for which broadcast is requested
     * @param listener - The callback for the broadcast request to remove
     * @returns This ISignalManager
     */
    offBroadcastRequested(signalName: string, listener: SignalListener): ISignalManager;
    /**
     * Request broadcast of a signal from other connected clients.  Other clients must have
     * registered to respond to broadcast requests using the `onBroadcastRequested` method.
     * @param signalName - The signal for which broadcast is requested
     * @param payload - A payload to send with the broadcast request
     */
    requestBroadcast(signalName: string, payload?: Jsonable): any;
}
/**
 * Duck type of something that provides the expected signalling functionality:
 * A way to verify we can signal, a way to send a signal, and a way to listen for incoming signals
 */
export interface ISignaler {
    connected: boolean;
    on(event: "signal", listener: (message: IInboundSignalMessage, local: boolean) => void): any;
    submitSignal(type: string, content: any): void;
}
/**
 * Note: currently experimental and under development
 *
 * Helper class to assist common scenarios around working with signals.  SignalManager wraps an
 * object with signaling functionality (e.g. ContainerRuntime or FluidDataStoreRuntime) and can
 * then be used in place of the original signaler.  It uses a separate internal EventEmitter to
 * manage callbacks, and thus will reflect that behavior with regards to callback registration and
 * deregistration.
 */
export declare class SignalManager extends TypedEventEmitter<IErrorEvent> implements ISignalManager {
    /**
     * Object to wrap that can submit and listen to signals
     */
    private readonly signaler;
    private readonly emitter;
    private readonly managerId;
    constructor(
    /**
     * Object to wrap that can submit and listen to signals
     */
    signaler: ISignaler, 
    /**
     * Optional id to assign to this manager that will be attached to
     * signal names.  Useful to avoid collisions if there are multiple
     * signal users at the Container level
     */
    managerId?: string);
    private getManagerSignalName;
    private getBroadcastSignalName;
    onSignal(signalName: string, listener: SignalListener): ISignalManager;
    offSignal(signalName: string, listener: SignalListener): ISignalManager;
    submitSignal(signalName: string, payload?: Jsonable): void;
    onBroadcastRequested(signalName: string, listener: SignalListener): ISignalManager;
    offBroadcastRequested(signalName: string, listener: SignalListener): ISignalManager;
    requestBroadcast(signalName: string, payload?: Jsonable): void;
}
//# sourceMappingURL=signalManager.d.ts.map