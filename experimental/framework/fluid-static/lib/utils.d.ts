/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { IChannelFactory } from "@fluidframework/datastore-definitions";
import { NamedFluidDataStoreRegistryEntry } from "@fluidframework/runtime-definitions";
import { ContainerSchema, DataObjectClass, SharedObjectClass } from "./types";
/**
 * Runtime check to determine if a class is a DataObject type
 */
export declare const isDataObjectClass: (obj: any) => obj is DataObjectClass<any>;
/**
 * Runtime check to determine if a class is a SharedObject type
 */
export declare const isSharedObjectClass: (obj: any) => obj is SharedObjectClass<any>;
/**
 * The ContainerSchema consists of initialObjects and dynamicObjectTypes. These types can be
 * of both SharedObject or DataObject. This function seperates the two and returns a registery
 * of DataObject types and an array of SharedObjects.
 */
export declare const parseDataObjectsFromSharedObjects: (schema: ContainerSchema) => [
    NamedFluidDataStoreRegistryEntry[],
    IChannelFactory[]
];
//# sourceMappingURL=utils.d.ts.map