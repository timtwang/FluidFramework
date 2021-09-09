/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { Loader } from "@fluidframework/container-loader";
import { DOProviderContainerRuntimeFactory, FluidContainer, } from "@fluid-experimental/fluid-framework";
import { RouterliciousDocumentServiceFactory } from "@fluidframework/routerlicious-driver";
import { requestFluidObject } from "@fluidframework/runtime-utils";
import { InsecureTinyliciousTokenProvider, InsecureTinyliciousUrlResolver, } from "@fluidframework/tinylicious-driver";
import { TinyliciousAudience } from "./TinyliciousAudience";
/**
 * TinyliciousClient provides the ability to have a Fluid object backed by a Tinylicious service
 */
export class TinyliciousClient {
    constructor(serviceConnectionConfig) {
        const tokenProvider = new InsecureTinyliciousTokenProvider();
        this.urlResolver = new InsecureTinyliciousUrlResolver(serviceConnectionConfig === null || serviceConnectionConfig === void 0 ? void 0 : serviceConnectionConfig.port, serviceConnectionConfig === null || serviceConnectionConfig === void 0 ? void 0 : serviceConnectionConfig.domain);
        this.documentServiceFactory = new RouterliciousDocumentServiceFactory(tokenProvider);
    }
    async createContainer(serviceContainerConfig, containerSchema) {
        const runtimeFactory = new DOProviderContainerRuntimeFactory(containerSchema);
        const container = await this.getContainerCore(serviceContainerConfig, runtimeFactory, true);
        return this.getFluidContainerAndServices(container);
    }
    async getContainer(serviceContainerConfig, containerSchema) {
        const runtimeFactory = new DOProviderContainerRuntimeFactory(containerSchema);
        const container = await this.getContainerCore(serviceContainerConfig, runtimeFactory, false);
        return this.getFluidContainerAndServices(container);
    }
    async getFluidContainerAndServices(container) {
        const rootDataObject = await requestFluidObject(container, "/");
        const fluidContainer = new FluidContainer(container, rootDataObject);
        const containerServices = this.getContainerServices(container);
        const tinyliciousResources = { fluidContainer, containerServices };
        return tinyliciousResources;
    }
    getContainerServices(container) {
        return {
            audience: new TinyliciousAudience(container),
        };
    }
    async getContainerCore(tinyliciousContainerConfig, containerRuntimeFactory, createNew) {
        const module = { fluidExport: containerRuntimeFactory };
        const codeLoader = { load: async () => module };
        const loader = new Loader({
            urlResolver: this.urlResolver,
            documentServiceFactory: this.documentServiceFactory,
            codeLoader,
            logger: tinyliciousContainerConfig.logger,
        });
        let container;
        if (createNew) {
            // We're not actually using the code proposal (our code loader always loads the same module
            // regardless of the proposal), but the Container will only give us a NullRuntime if there's
            // no proposal.  So we'll use a fake proposal.
            container = await loader.createDetachedContainer({
                package: "no-dynamic-package",
                config: {},
            });
            await container.attach({ url: tinyliciousContainerConfig.id });
        }
        else {
            // Request must be appropriate and parseable by resolver.
            container = await loader.resolve({ url: tinyliciousContainerConfig.id });
        }
        return container;
    }
}
//# sourceMappingURL=TinyliciousClient.js.map