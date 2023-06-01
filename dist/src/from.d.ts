/**
 * Get a constructed tree.
 * @param nodes Tree node array
 * @param option
 * option.key: unique property's name for node.
 * option.parentKey: unique property's name for parent node.
 * option.childrenKey: unique property's name for children node.
 * @returns A constructed tree
 */
export declare function from<T>(nodes: T[], option?: TreeOption<T>): T[];
export interface TreeOption<T> {
    key: keyof T;
    parentKey: keyof T;
    childrenKey: keyof T;
}
