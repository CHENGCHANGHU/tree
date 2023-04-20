function getDefaultTraverseOption<T, V>(): TraverseOption<T, V> {
  return {
    childrenKey: 'children' as keyof T,
    order: 'pre',
    state: undefined,
  };
}

/**
 * Traverse a tree.
 * @param tree tree root
 * @param reducer handler function with parameter of current tree and accumulator state
 * @param option
 * option.childrenKey: specify the tree's children key (default value: 'children').
 * option.order: ['pre'|'post'], traverse a tree in pre-order or post-order.
 * option.state: the state when traverse.
 * @returns accumulator state or undefined
 */
export function traverse<T, V>(
  tree: T,
  reducer: (tree: T, state?: V) => void | V,
  option: TraverseOption<T, V> = getDefaultTraverseOption<T, V>(),
): undefined | V {
  const { childrenKey, order, state } = {
    ...getDefaultTraverseOption<T, V>(),
    ...option,
  };

  if (order === 'pre') {
    reducer(tree, state);
  }

  if (childrenKey && Array.isArray(tree[childrenKey])) {
    (tree[childrenKey] as T[]).forEach(child => traverse<T, V>(child as T, reducer, option));
  }

  if (order === 'post') {
    reducer(tree, state);
  }

  return state;
}

export interface TraverseOption<T, V> {
  childrenKey?: keyof T,
  order?: 'pre' | 'post',
  state?: V,
}
