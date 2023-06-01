/**
 * Traverse a tree.
 * @param tree tree root
 * @param reducer
 * Handler function with parameter of current tree and accumulator state.
 * If handler function returns false, it will terminate the traverse flow.
 * @param option
 * option.childrenKey: specify the tree's children key (default value: 'children').
 * option.order: ['pre'|'post'], traverse a tree in pre-order or post-order.
 * option.state: the state when traverse.
 * @returns accumulator state or undefined
 */
export declare function traverse<T, V>(tree: T, reducer: (tree: T, state?: V) => void | V, option?: TraverseOption<T, V>): undefined | V;
export interface TraverseOption<T, V> {
    childrenKey?: keyof T;
    order?: 'pre' | 'post';
    state?: V;
}
