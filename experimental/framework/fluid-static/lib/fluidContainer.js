/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { TypedEventEmitter } from "@fluidframework/common-utils";
export class FluidContainer extends TypedEventEmitter {
    constructor(container, rootDataObject) {
        super();
        this.container = container;
        this.rootDataObject = rootDataObject;
        this.connectedHandler = () => this.emit("connected");
        this.disconnectedHandler = () => this.emit("disconnected");
        this.disposedHandler = () => this.emit("disposed");
        container.on("connected", this.connectedHandler);
        container.on("closed", this.disposedHandler);
        container.on("disconnected", this.disconnectedHandler);
    }
    get disposed() {
        return this.container.closed;
    }
    get connected() {
        return this.container.connected;
    }
    get initialObjects() {
        return this.rootDataObject.initialObjects;
    }
    /**
    * @deprecated - Audience is being moved to the client packages
    */
    get audience() {
        return this.container.audience;
    }
    /**
    * @deprecated - clientId is being moved to the client packages
    */
    get clientId() {
        return this.container.clientId;
    }
    async create(objectClass) {
        return this.rootDataObject.create(objectClass);
    }
    dispose() {
        this.container.close();
        this.container.off("connected", this.connectedHandler);
        this.container.off("closed", this.disposedHandler);
        this.container.off("disconnected", this.disconnectedHandler);
    }
}
//# sourceMappingURL=fluidContainer.js.map