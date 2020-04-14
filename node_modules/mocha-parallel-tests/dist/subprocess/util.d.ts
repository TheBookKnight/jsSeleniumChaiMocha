export declare type EntityType = 'suite' | 'test' | 'hook';
export declare function getMessageId(entityType: EntityType, entityTitle: string, eventCounter: number): string;
