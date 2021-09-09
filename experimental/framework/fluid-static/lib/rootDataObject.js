/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { BaseContainerRuntimeFactory, DataObject, DataObjectFactory, defaultRouteRequestHandler, } from "@fluidframework/aqueduct";
import { requestFluidObject } from "@fluidframework/runtime-utils";
import { isDataObjectClass, isSharedObjectClass, parseDataObjectsFromSharedObjects } from "./utils";
// eslint-disable-next-line @typescript-eslint/ban-types
export class RootDataObject extends DataObject {
    constructor() {
        super(...arguments);
        this.initialObjectsDirKey = "initial-objects-key";
        this._initialObjects = {};
    }
    get initialObjectsDir() {
        const dir = this.root.getSubDirectory(this.initialObjectsDirKey);
        if (dir === undefined) {
            throw new Error("InitialObjects sub-directory was not initialized");
        }
        return dir;
    }
    async initializingFirstTime(props) {
        this.root.createSubDirectory(this.initialObjectsDirKey);
        // Create initial objects provided by the developer
        const initialObjectsP = [];
        Object.entries(props.initialObjects).forEach(([id, objectClass]) => {
            const createObject = async () => {
                const obj = await this.create(objectClass);
                this.initialObjectsDir.set(id, obj.handle);
            };
            initialObjectsP.push(createObject());
        });
        await Promise.all(initialObjectsP);
    }
    async hasInitialized() {
        // We will always load the initial objects so they are available to the developer
        const loadInitialObjectsP = [];
        for (const [key, value] of Array.from(this.initialObjectsDir.entries())) {
            const loadDir = async () => {
                const obj = await value.get();
                Object.assign(this._initialObjects, { [key]: obj });
            };
            loadInitialObjectsP.push(loadDir());
        }
        await Promise.all(loadInitialObjectsP);
    }
    get initialObjects() {
        if (Object.keys(this._initialObjects).length === 0) {
            throw new Error("Initial Objects were not correctly initialized");
        }
        return this._initialObjects;
    }
    async create(objectClass) {
        if (isDataObjectClass(objectClass)) {
            return this.createDataObject(objectClass);
        }
        else if (isSharedObjectClass(objectClass)) {
            return this.createSharedObject(objectClass);
        }
        throw new Error("Could not create new Fluid object because an unknown object was passed");
    }
    async createDataObject(dataObjectClass) {
        const factory = dataObjectClass.factory;
        const packagePath = [...this.context.packagePath, factory.type];
        const router = await this.context.containerRuntime.createDataStore(packagePath);
        return requestFluidObject(router, "/");
    }
    createSharedObject(sharedObjectClass) {
        const factory = sharedObjectClass.getFactory();
        const obj = this.runtime.createChannel(undefined, factory.type);
        return obj;
    }
}
const rootDataStoreId = "rootDOId";
/**
 * The DOProviderContainerRuntimeFactory is the container code for our scenario.
 *
 * By including the createRequestHandler, we can create any droplet types we include in the registry on-demand.
 * These can then be retrieved via container.request("/dataObjectId").
 */
export class DOProviderContainerRuntimeFactory extends BaseContainerRuntimeFactory {
    constructor(schema) {
        const [registryEntries, sharedObjects] = parseDataObjectsFromSharedObjects(schema);
        const rootDataObjectFactory = 
        // eslint-disable-next-line @typescript-eslint/ban-types
        new DataObjectFactory("rootDO", RootDataObject, sharedObjects, {}, registryEntries);
        super([rootDataObjectFactory.registryEntry], [], [defaultRouteRequestHandler(rootDataStoreId)]);
        this.rootDataObjectFactory = rootDataObjectFactory;
        this.initialObjects = schema.initialObjects;
    }
    async containerInitializingFirstTime(runtime) {
        // The first time we create the container we create the RootDataObject
        await this.rootDataObjectFactory.createRootInstance(rootDataStoreId, runtime, { initialObjects: this.initialObjects });
    }
}
//# sourceMappingURL=rootDataObject.js.map