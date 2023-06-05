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
 * Handler function with parameters of current tree node, accumulator state and current tree's parent node.
 * If handler function returns false, it will terminate the traverse flow.
 * @param option
 * option.childrenKey: specify the tree's children key (default value: 'children').
 * option.order: ['pre'|'post'|'pre-reverse'|'post-reverse'], traverse a tree in pre-order, post-order, pre-order-reverse, or post-order-reverse.
 * option.state: the state when traverse.
 * @returns accumulator state or undefined
 */
export function traverse<T, V>(
  tree: T,
  reducer: (tree: T, state?: V, parent?: T | null) => void | V,
  option: TraverseOption<T, V> = getDefaultTraverseOption<T, V>(),
): undefined | V {
  const { childrenKey, order, state } = {
    ...getDefaultTraverseOption<T, V>(),
    ...option,
  };
  let parent: T = undefined;

  [tree].every(function traveler(_tree, index, list): boolean {
    const _parent = parent;
    let continueFlag = undefined;

    if (order === 'pre' || order === 'pre-reverse') {
      continueFlag = reducer(_tree, state, parent);
    }
  
    parent = _tree;
    if (childrenKey && Array.isArray(_tree[childrenKey])) {
      if (order === 'pre' || order === 'post') {
        continueFlag = (_tree[childrenKey] as T[]).every(traveler);
      } else {
        continueFlag = reverse((_tree[childrenKey] as T[])).every(traveler);
      }
    }
    parent = _parent;
  
    if (order === 'post' || order === 'post-reverse') {
      continueFlag = reducer(_tree, state, parent);
    }

    return continueFlag !== false;
  });

  return state;
}

function reverse<T>(arr: T[]): T[] {
  return arr.reduce((acc, curr) => {
    acc.unshift(curr);
    return acc;
  }, []);
}

export interface TraverseOption<T, V> {
  childrenKey?: keyof T,
  order?: 'pre' | 'post' | 'pre-reverse' | 'post-reverse',
  state?: V,
}
