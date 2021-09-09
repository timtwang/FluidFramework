/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { TypedEventEmitter } from "@fluidframework/common-utils";
import { IAudience } from "@fluidframework/container-definitions";
import { Container } from "@fluidframework/container-loader";
import { IClient } from "@fluidframework/protocol-definitions";
import { IServiceAudience, IServiceAudienceEvents, IMember } from "./types";
export declare abstract class ServiceAudience<M extends IMember = IMember> extends TypedEventEmitter<IServiceAudienceEvents<M>> implements IServiceAudience<M> {
    protected readonly container: Container;
    protected readonly audience: IAudience;
    /**
     * Retain the most recent member list.  This is so we have more information about a member
     * leaving the audience in the removeMember event.  It allows us to match the behavior of the
     * addMember event where it only fires on a change to the members this class exposes (and would
     * actually produce a change in what getMembers returns).  It also allows us to provide the
     * client details in the event which makes it easier to find that client connection in a map
     * keyed on the userId and not clientId.
     * This map will always be up-to-date in a removeMember event because it is set once at
     * construction and in every addMember event.
     * It is mapped clientId to M to be better work with what the IAudience event provides
     */
    protected lastMembers: Map<string, M>;
    constructor(container: Container);
    protected abstract createServiceMember(audienceMember: IClient): M;
    /**
     * {@inheritDoc IServiceAudience.getMembers}
     */
    getMembers(): Map<string, M>;
    /**
     * {@inheritDoc IServiceAudience.getMyself}
     */
    getMyself(): M | undefined;
    private getMember;
    protected shouldIncludeAsMember(member: IClient): boolean;
}
//# sourceMappingURL=serviceAudience.d.ts.map