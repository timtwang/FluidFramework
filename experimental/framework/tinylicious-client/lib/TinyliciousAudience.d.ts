/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { ServiceAudience } from "@fluid-experimental/fluid-framework";
import { IClient } from "@fluidframework/protocol-definitions";
import { ITinyliciousAudience, TinyliciousMember } from "./interfaces";
export declare class TinyliciousAudience extends ServiceAudience<TinyliciousMember> implements ITinyliciousAudience {
    protected createServiceMember(audienceMember: IClient): TinyliciousMember;
}
//# sourceMappingURL=TinyliciousAudience.d.ts.map