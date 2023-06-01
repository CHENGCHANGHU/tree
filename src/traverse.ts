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
 * @param reducer
 * Handler function with parameter of current tree and accumulator state.
 * If handler function returns false, it will terminate the traverse flow.
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

  [tree].every(function traveler(_tree): boolean {
    let continueFlag = undefined;

    if (order === 'pre') {
      continueFlag = reducer(_tree, state);
    }
  
    if (childrenKey && Array.isArray(_tree[childrenKey])) {
      continueFlag = (_tree[childrenKey] as T[]).every(traveler);
    }
  
    if (order === 'post') {
      continueFlag = reducer(_tree, state);
    }

    return continueFlag !== false;
  });

  return state;
}

export interface TraverseOption<T, V> {
  childrenKey?: keyof T,
  order?: 'pre' | 'post',
  state?: V,
}
