/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { EventEmitter } from "events";
import { TypedEventEmitter } from "@fluidframework/common-utils";
/**
 * Note: currently experimental and under development
 *
 * Helper class to assist common scenarios around working with signals.  SignalManager wraps an
 * object with signaling functionality (e.g. ContainerRuntime or FluidDataStoreRuntime) and can
 * then be used in place of the original signaler.  It uses a separate internal EventEmitter to
 * manage callbacks, and thus will reflect that behavior with regards to callback registration and
 * deregistration.
 */
export class SignalManager extends TypedEventEmitter {
    constructor(
    /**
     * Object to wrap that can submit and listen to signals
     */
    signaler, 
    /**
     * Optional id to assign to this manager that will be attached to
     * signal names.  Useful to avoid collisions if there are multiple
     * signal users at the Container level
     */
    managerId) {
        super();
        this.signaler = signaler;
        this.emitter = new EventEmitter();
        this.managerId = managerId ? `#${managerId}` : undefined;
        this.signaler.on("signal", (message, local) => {
            const clientId = message.clientId;
            // Only call listeners when the runtime is connected and if the signal has an
            // identifiable sender clientId.  The listener is responsible for deciding how
            // it wants to handle local/remote signals
            // eslint-disable-next-line no-null/no-null
            if (this.signaler.connected && clientId !== null) {
                this.emitter.emit(message.type, clientId, local, message.content);
            }
        });
    }
    getManagerSignalName(signalName) {
        return this.managerId ? `${signalName}${this.managerId}` : signalName;
    }
    getBroadcastSignalName(signalName) {
        return `${signalName}#req`;
    }
    // ISignalManager methods
    onSignal(signalName, listener) {
        const managerSignalName = this.getManagerSignalName(signalName);
        this.emitter.on(managerSignalName, listener);
        return this;
    }
    offSignal(signalName, listener) {
        const managerSignalName = this.getManagerSignalName(signalName);
        this.emitter.off(managerSignalName, listener);
        return this;
    }
    submitSignal(signalName, payload) {
        const managerSignalName = this.getManagerSignalName(signalName);
        if (this.signaler.connected) {
            this.signaler.submitSignal(managerSignalName, payload);
        }
    }
    onBroadcastRequested(signalName, listener) {
        const broadcastSignalName = this.getBroadcastSignalName(signalName);
        return this.onSignal(broadcastSignalName, listener);
    }
    offBroadcastRequested(signalName, listener) {
        const broadcastSignalName = this.getBroadcastSignalName(signalName);
        return this.offSignal(broadcastSignalName, listener);
    }
    requestBroadcast(signalName, payload) {
        const broadcastSignalName = this.getBroadcastSignalName(signalName);
        this.submitSignal(broadcastSignalName, payload);
    }
}
//# sourceMappingURL=signalManager.js.map