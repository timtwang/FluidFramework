/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { ContainerSchema } from "@fluid-experimental/fluid-framework";
import { IDocumentServiceFactory, IUrlResolver } from "@fluidframework/driver-definitions";
import { TinyliciousConnectionConfig, TinyliciousContainerConfig, TinyliciousResources } from "./interfaces";
/**
 * TinyliciousClient provides the ability to have a Fluid object backed by a Tinylicious service
 */
export declare class TinyliciousClient {
    readonly documentServiceFactory: IDocumentServiceFactory;
    readonly urlResolver: IUrlResolver;
    constructor(serviceConnectionConfig?: TinyliciousConnectionConfig);
    createContainer(serviceContainerConfig: TinyliciousContainerConfig, containerSchema: ContainerSchema): Promise<TinyliciousResources>;
    getContainer(serviceContainerConfig: TinyliciousContainerConfig, containerSchema: ContainerSchema): Promise<TinyliciousResources>;
    private getFluidContainerAndServices;
    private getContainerServices;
    private getContainerCore;
}
//# sourceMappingURL=TinyliciousClient.d.ts.map