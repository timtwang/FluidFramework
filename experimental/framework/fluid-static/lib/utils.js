/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Runtime check to determine if a class is a DataObject type
 */
export const isDataObjectClass = (obj) => {
    return (obj === null || obj === void 0 ? void 0 : obj.factory) !== undefined;
};
/**
 * Runtime check to determine if a class is a SharedObject type
 */
export const isSharedObjectClass = (obj) => {
    return (obj === null || obj === void 0 ? void 0 : obj.getFactory) !== undefined;
};
/**
 * The ContainerSchema consists of initialObjects and dynamicObjectTypes. These types can be
 * of both SharedObject or DataObject. This function seperates the two and returns a registery
 * of DataObject types and an array of SharedObjects.
 */
export const parseDataObjectsFromSharedObjects = (schema) => {
    const registryEntries = new Set();
    const sharedObjects = new Set();
    const tryAddObject = (obj) => {
        if (isSharedObjectClass(obj)) {
            sharedObjects.add(obj.getFactory());
        }
        else if (isDataObjectClass(obj)) {
            registryEntries.add([obj.factory.type, Promise.resolve(obj.factory)]);
        }
        else {
            throw new Error(`Entry is neither a DataObject or a SharedObject`);
        }
    };
    // Add the object types that will be initialized
    Object.values(schema.initialObjects).forEach((obj) => {
        tryAddObject(obj);
    });
    // If there are dynamic object types we will add them now
    if (schema.dynamicObjectTypes) {
        for (const obj of schema.dynamicObjectTypes) {
            tryAddObject(obj);
        }
    }
    if (registryEntries.size === 0 && sharedObjects.size === 0) {
        throw new Error("Container cannot be initialized without any DataTypes");
    }
    return [Array.from(registryEntries), Array.from(sharedObjects)];
};
//# sourceMappingURL=utils.js.map