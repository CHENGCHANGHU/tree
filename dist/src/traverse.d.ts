/**
 * Traverse a tree.
 * @param tree tree root
 * @param reducer
 * Handler function with parameters of current tree node, accumulator state and current tree's parent node.
 * If handler function returns false, it will terminate the traverse flow.
 * @param option
 * option.childrenKey: specify the tree's children key (default value: 'children').
 * option.order: ['pre'|'post'], traverse a tree in pre-order or post-order.
 * option.state: the state when traverse.
 * @returns accumulator state or undefined
 */
export declare function traverse<T, V>(tree: T, reducer: (tree: T, state?: V, parent?: T | null) => void | V, option?: TraverseOption<T, V>): undefined | V;
export interface TraverseOption<T, V> {
    childrenKey?: keyof T;
    order?: 'pre' | 'post';
    state?: V;
}
