## API Report File for "@intentional/shared-tree"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { EventEmitterWithErrorHandling } from '@fluidframework/telemetry-utils';
import { IChannelAttributes } from '@fluidframework/datastore-definitions';
import { IChannelFactory } from '@fluidframework/datastore-definitions';
import { IChannelServices } from '@fluidframework/datastore-definitions';
import { IChannelStorageService } from '@fluidframework/datastore-definitions';
import { IDisposable } from '@fluidframework/common-definitions';
import { IFluidDataStoreRuntime } from '@fluidframework/datastore-definitions';
import { IFluidSerializer } from '@fluidframework/core-interfaces';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISerializedHandle } from '@fluidframework/core-interfaces';
import { ISharedObject } from '@fluidframework/shared-object-base';
import { ITelemetryBaseEvent } from '@fluidframework/common-definitions';
import { ITelemetryLogger } from '@fluidframework/common-definitions';
import { ITree } from '@fluidframework/protocol-definitions';
import { SharedObject } from '@fluidframework/shared-object-base';

// @public @sealed
export class BasicCheckout extends Checkout {
    constructor(tree: SharedTree);
    // (undocumented)
    protected handleNewEdit(edit: Edit, view: Snapshot): void;
    // (undocumented)
    protected get latestCommittedView(): Snapshot;
    // (undocumented)
    waitForPendingUpdates(): Promise<void>;
}

// Warning: (ae-internal-missing-underscore) The name "BlobId" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type BlobId = string;

// @public
export interface Build {
    // (undocumented)
    readonly destination: DetachedSequenceId;
    // (undocumented)
    readonly source: TreeNodeSequence<EditNode>;
    // (undocumented)
    readonly type: typeof ChangeType.Build;
}

// @public
export type Change = Insert | Detach | Build | SetValue | Constraint;

// @public (undocumented)
export const Change: {
    build: (source: TreeNodeSequence<EditNode>, destination: DetachedSequenceId) => Build;
    insert: (source: DetachedSequenceId, destination: StablePlace) => Insert;
    detach: (source: StableRange, destination?: DetachedSequenceId | undefined) => Detach;
    setPayload: (nodeToModify: NodeId, payload: Payload) => SetValue;
    clearPayload: (nodeToModify: NodeId) => SetValue;
    constraint: (toConstrain: StableRange, effect: ConstraintEffect, identityHash?: UuidString | undefined, length?: number | undefined, contentHash?: UuidString | undefined, parentNode?: NodeId | undefined, label?: TraitLabel | undefined) => Constraint;
};

// @public
export type ChangeNode = TreeNode<ChangeNode>;

// @public
export enum ChangeType {
    // (undocumented)
    Build = 2,
    // (undocumented)
    Constraint = 4,
    // (undocumented)
    Detach = 1,
    // (undocumented)
    Insert = 0,
    // (undocumented)
    SetValue = 3
}

// @public @sealed
export abstract class Checkout extends EventEmitterWithErrorHandling implements IDisposable {
    protected constructor(tree: SharedTree, currentView: Snapshot, onEditCommitted: any);
    abortEdit(): void;
    applyChanges(...changes: Change[]): void;
    applyEdit(...changes: Change[]): EditId;
    closeEdit(): EditId;
    // (undocumented)
    get currentView(): Snapshot;
    dispose(error?: Error): void;
    // (undocumented)
    disposed: boolean;
    protected emitChange(): void;
    // (undocumented)
    getEditStatus(): EditResult;
    protected abstract handleNewEdit(edit: Edit, view: Snapshot): void;
    // @internal (undocumented)
    hasOpenEdit(): boolean;
    protected abstract readonly latestCommittedView: Snapshot;
    openEdit(): void;
    rebaseCurrentEdit(): EditValidationResult.Valid | EditValidationResult.Invalid;
    readonly tree: SharedTree;
    // (undocumented)
    abstract waitForPendingUpdates(): Promise<void>;
}

// @public
export enum CheckoutEvent {
    ViewChange = "viewChange"
}

// @public
export interface Constraint {
    readonly contentHash?: UuidString;
    readonly effect: ConstraintEffect;
    readonly identityHash?: UuidString;
    readonly label?: TraitLabel;
    readonly length?: number;
    readonly parentNode?: NodeId;
    readonly toConstrain: StableRange;
    readonly type: typeof ChangeType.Constraint;
}

// @public
export enum ConstraintEffect {
    InvalidAndDiscard = 0,
    InvalidRetry = 1,
    ValidRetry = 2
}

// @public
export type Definition = UuidString & {
    readonly Definition: 'c0ef9488-2a78-482d-aeed-37fba996354c';
};

// @public
export const Delete: {
    create: (stableRange: StableRange) => Change;
};

// @public
export interface Delta<ID> {
    readonly added: readonly ID[];
    readonly changed: readonly ID[];
    readonly removed: readonly ID[];
}

// @public
export interface Detach {
    // (undocumented)
    readonly destination?: DetachedSequenceId;
    // (undocumented)
    readonly source: StableRange;
    // (undocumented)
    readonly type: typeof ChangeType.Detach;
}

// @public
export type DetachedSequenceId = number & {
    readonly DetachedSequenceId: 'f7d7903a-194e-45e7-8e82-c9ef4333577d';
};

// @public
export interface Edit extends EditBase {
    readonly id: EditId;
}

// @public
export interface EditBase {
    readonly changes: readonly Change[];
}

// @public
export type EditId = UuidString & {
    readonly EditId: '56897beb-53e4-4e66-85da-4bf5cd5d0d49';
};

// Warning: (ae-internal-missing-underscore) The name "EditLogSummary" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface EditLogSummary {
    readonly editChunks: readonly {
        key: number;
        chunk: SerializedChunk;
    }[];
    readonly editIds: readonly EditId[];
}

// @public
export type EditNode = TreeNode<EditNode> | DetachedSequenceId;

// @public
export enum EditResult {
    Applied = 2,
    Invalid = 1,
    Malformed = 0
}

// @public
export enum EditValidationResult {
    Invalid = 1,
    Malformed = 0,
    Valid = 2
}

// @public
export interface EditWithoutId extends EditBase {
    readonly id?: never;
}

// Warning: (ae-incompatible-release-tags) The symbol "fullHistorySummarizer" is marked as @public, but its signature references "SharedTreeSummary_0_0_2" which is marked as @internal
//
// @public
export function fullHistorySummarizer(editLog: OrderedEditSet, currentView: Snapshot): SharedTreeSummary_0_0_2;

// @public
export const initialTree: ChangeNode;

// @public
export interface Insert {
    // (undocumented)
    readonly destination: StablePlace;
    // (undocumented)
    readonly source: DetachedSequenceId;
    // (undocumented)
    readonly type: typeof ChangeType.Insert;
}

// @public
export const Insert: {
    create: (nodes: EditNode[], destination: StablePlace) => Change[];
};

// @public
export function isSharedTreeEvent(event: ITelemetryBaseEvent): boolean;

// Warning: (ae-internal-missing-underscore) The name "LogViewer" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface LogViewer {
    getSnapshot(revision: number): Promise<Snapshot>;
    getSnapshotInSession(revision: number): Snapshot;
    setKnownRevision(revision: number, view: Snapshot): void;
}

// @public
export const Move: {
    create: (source: StableRange, destination: StablePlace) => Change[];
};

// @public
export function newEdit(changes: readonly Change[]): Edit;

// @public
export interface NodeData {
    readonly definition: Definition;
    readonly identifier: NodeId;
    // (undocumented)
    readonly payload?: Payload;
}

// @public
export type NodeId = UuidString & {
    readonly NodeId: 'e53e7d6b-c8b9-431a-8805-4843fc639342';
};

// @public
export interface NodeInTrait {
    // (undocumented)
    readonly index: TraitNodeIndex;
    // (undocumented)
    readonly trait: TraitLocation;
}

// Warning: (ae-incompatible-release-tags) The symbol "noHistorySummarizer" is marked as @public, but its signature references "SharedTreeSummary_0_0_2" which is marked as @internal
//
// @public
export function noHistorySummarizer(_editLog: OrderedEditSet, currentView: Snapshot): SharedTreeSummary_0_0_2;

// @public @sealed
export interface OrderedEditSet {
    // (undocumented)
    editIds: EditId[];
    // (undocumented)
    getEditAtIndex(index: number): Promise<Edit>;
    // (undocumented)
    getEditInSessionAtIndex(index: number): Edit;
    // @internal (undocumented)
    getEditLogSummary(useHandles?: boolean): EditLogSummary;
    // (undocumented)
    getIdAtIndex(index: number): EditId;
    // (undocumented)
    getIndexOfId(editId: EditId): number;
    // (undocumented)
    length: number;
    // (undocumented)
    tryGetEdit(editId: EditId): Promise<Edit | undefined>;
}

// @public
export interface Payload {
    // (undocumented)
    readonly base64: string;
}

// @public
export type PlaceIndex = number & {
    readonly PlaceIndex: unique symbol;
};

// @public
export function revert(edit: Edit, view: Snapshot): Change[];

// @public
export type SerializedChunk = ISerializedHandle | EditWithoutId[];

// @public
export function setTrait(trait: TraitLocation, nodes: TreeNodeSequence<EditNode>): readonly Change[];

// @public
export interface SetValue {
    // (undocumented)
    readonly nodeToModify: NodeId;
    readonly payload: Payload | null;
    // (undocumented)
    readonly type: typeof ChangeType.SetValue;
}

// @public @sealed
export class SharedTree extends SharedObject {
    constructor(runtime: IFluidDataStoreRuntime, id: string, expensiveValidation?: boolean);
    // @internal
    applyEdit(...changes: Change[]): EditId;
    static create(runtime: IFluidDataStoreRuntime, id?: string): SharedTree;
    // (undocumented)
    get currentView(): Snapshot;
    get editor(): SharedTreeEditor;
    // (undocumented)
    get edits(): OrderedEditSet;
    equals(sharedTree: SharedTree): boolean;
    static getFactory(): SharedTreeFactory;
    // (undocumented)
    protected loadCore(storage: IChannelStorageService): Promise<void>;
    // @internal
    loadSummary(summary: SharedTreeSummaryBase): void;
    // (undocumented)
    protected readonly logger: ITelemetryLogger;
    // @internal
    logViewer: LogViewer;
    // (undocumented)
    protected onDisconnect(): void;
    // @internal
    payloadCache: Map<BlobId, Payload>;
    // (undocumented)
    protected processCore(message: ISequencedDocumentMessage, local: boolean): void;
    // @internal
    processLocalEdit(edit: Edit): void;
    // (undocumented)
    protected registerCore(): void;
    // @internal
    saveSummary(): SharedTreeSummaryBase;
    // (undocumented)
    snapshotCore(_serializer: IFluidSerializer): ITree;
    summarizer: SharedTreeSummarizer;
    }

// @public
export const sharedTreeAssertionErrorType = "SharedTreeAssertion";

// @public
export class SharedTreeEditor {
    constructor(tree: SharedTree);
    delete(target: ChangeNode): EditId;
    delete(target: StableRange): EditId;
    insert(node: EditNode, destination: StablePlace): EditId;
    insert(nodes: EditNode[], destination: StablePlace): EditId;
    move(source: ChangeNode, destination: StablePlace): EditId;
    move(source: StableRange, destination: StablePlace): EditId;
    revert(edit: Edit, view: Snapshot): EditId;
    }

// @public
export enum SharedTreeEvent {
    // @internal
    ChunksUploaded = "uploadedChunks",
    EditCommitted = "committedEdit"
}

// @public @sealed
export class SharedTreeFactory implements IChannelFactory {
    // (undocumented)
    static Attributes: IChannelAttributes;
    // (undocumented)
    get attributes(): IChannelAttributes;
    create(runtime: IFluidDataStoreRuntime, id: string): ISharedObject;
    // (undocumented)
    load(runtime: IFluidDataStoreRuntime, id: string, services: IChannelServices, _channelAttributes: Readonly<IChannelAttributes>): Promise<ISharedObject>;
    // (undocumented)
    static Type: string;
    // (undocumented)
    get type(): string;
}

// @public
export type SharedTreeSummarizer = (editLog: OrderedEditSet, currentView: Snapshot) => SharedTreeSummaryBase;

// Warning: (ae-internal-missing-underscore) The name "SharedTreeSummary_0_0_2" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface SharedTreeSummary_0_0_2 extends SharedTreeSummaryBase {
    // (undocumented)
    readonly currentTree: ChangeNode;
    readonly sequencedEdits: readonly Edit[];
}

// @public
export interface SharedTreeSummaryBase {
    readonly version: string;
}

// @public
export enum Side {
    // (undocumented)
    After = 1,
    // (undocumented)
    Before = 0
}

// @public
export class Snapshot {
    // (undocumented)
    [Symbol.iterator](): IterableIterator<SnapshotNode>;
    assertConsistent(): void;
    deleteNodes(nodes: Iterable<NodeId>): Snapshot;
    delta(snapshot: Snapshot): Delta<NodeId>;
    equals(snapshot: Snapshot): boolean;
    // (undocumented)
    findIndexWithinTrait(place: SnapshotPlace): PlaceIndex;
    static fromTree(root: ChangeNode): Snapshot;
    // (undocumented)
    getChangeNode(id: NodeId): ChangeNode;
    // (undocumented)
    getChangeNodes(nodeIds: readonly NodeId[]): ChangeNode[];
    getChangeNodeTree(): ChangeNode;
    getParentSnapshotNode(id: NodeId): SnapshotNode | undefined;
    getSnapshotNode(id: NodeId): SnapshotNode;
    getTrait(traitLocation: TraitLocation): readonly NodeId[];
    // (undocumented)
    getTraitAddress(node: NodeId): NodeInTrait;
    getTraitLabel(id: NodeId): TraitLabel | undefined;
    // (undocumented)
    hasNode(id: NodeId): boolean;
    insertSnapshotNodes(sequence: Iterable<[NodeId, SnapshotNode]>): Snapshot;
    mergeWith(nodes: Iterable<[NodeId, SnapshotNode]>, merger: (oldVal: SnapshotNode, newVal: SnapshotNode, key: NodeId) => SnapshotNode): Snapshot;
    placeFromStablePlace(stablePlace: StablePlace): SnapshotPlace;
    rangeFromStableRange(range: StableRange): SnapshotRange;
    replaceNode(nodeId: NodeId, node: SnapshotNode): Snapshot;
    // (undocumented)
    readonly root: NodeId;
    get size(): number;
    updateTraitContents(traitLocation: TraitLocation, newContents: NodeId[]): Snapshot;
    validateStablePlace(place: StablePlace): EditValidationResult;
    validateStableRange(range: StableRange): EditValidationResult;
}

// @public
export interface SnapshotNode extends NodeData {
    // (undocumented)
    readonly traits: ReadonlyMap<TraitLabel, readonly NodeId[]>;
}

// @public
export interface SnapshotPlace {
    // (undocumented)
    readonly sibling?: NodeId;
    // (undocumented)
    readonly side: Side;
    // (undocumented)
    readonly trait: TraitLocation;
}

// @public
export interface SnapshotRange {
    // (undocumented)
    readonly end: SnapshotPlace;
    // (undocumented)
    readonly start: SnapshotPlace;
}

// @public
export interface StablePlace {
    readonly referenceSibling?: NodeId;
    readonly referenceTrait?: TraitLocation;
    readonly side: Side;
}

// @public (undocumented)
export const StablePlace: {
    before: (node: ChangeNode) => StablePlace;
    after: (node: ChangeNode) => StablePlace;
    atStartOf: (trait: TraitLocation) => StablePlace;
    atEndOf: (trait: TraitLocation) => StablePlace;
};

// @public
export interface StableRange {
    // (undocumented)
    readonly end: StablePlace;
    // (undocumented)
    readonly start: StablePlace;
}

// @public (undocumented)
export const StableRange: {
    from: (start: StablePlace) => {
        to: (end: StablePlace) => StableRange;
    };
    only: (node: ChangeNode) => StableRange;
    all: (trait: TraitLocation) => StableRange;
};

// @public
export type TraitLabel = UuidString & {
    readonly TraitLabel: '613826ed-49cc-4df3-b2b8-bfc6866af8e3';
};

// @public
export interface TraitLocation {
    // (undocumented)
    readonly label: TraitLabel;
    // (undocumented)
    readonly parent: NodeId;
}

// @public
export interface TraitMap<TChild> {
    // (undocumented)
    readonly [key: string]: TreeNodeSequence<TChild>;
}

// @public
export type TraitNodeIndex = number & {
    readonly TraitNodeIndex: unique symbol;
};

// @public
export interface TreeNode<TChild> extends NodeData {
    // (undocumented)
    readonly traits: TraitMap<TChild>;
}

// @public
export class TreeNodeHandle implements TreeNode<TreeNodeHandle> {
    constructor(snapshot: Snapshot, nodeId: NodeId);
    // (undocumented)
    get definition(): Definition;
    demandTree(): ChangeNode;
    // (undocumented)
    get identifier(): NodeId;
    get node(): ChangeNode;
    // (undocumented)
    get payload(): Payload | undefined;
    // (undocumented)
    toString(): string;
    // (undocumented)
    get traits(): TraitMap<TreeNodeHandle>;
}

// @public
export type TreeNodeSequence<TChild> = readonly TChild[];

// @public
export type UuidString = string & {
    readonly UuidString: '9d40d0ae-90d9-44b1-9482-9f55d59d5465';
};


```