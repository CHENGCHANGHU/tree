import { clone } from '@golden-tiger/clone';

function getDefaultTreeOption<T>() {
  return {
    key: 'id' as keyof T,
    parentKey: 'parent_id' as keyof T,
    childrenKey: 'children' as keyof T,
  };
}

/**
 * Get a constructed tree.
 * @param nodes Tree node array
 * @param option
 * option.key: unique property's name for node.
 * option.parentKey: unique property's name for parent node.
 * option.childrenKey: unique property's name for children node.
 * @returns A constructed tree
 */
export function from<T>(
  nodes: T[],
  option: TreeOption<T> = getDefaultTreeOption<T>(),
): T[] {
  const tempNodes = clone(nodes);
  const parentMap = new Map();

  const { key, parentKey, childrenKey } = {
    ...getDefaultTreeOption<T>(),
    ...option,
  };

  tempNodes.forEach((node: T) => {
    const parentValue = node[key];
    if (parentValue !== undefined) {
      parentMap.set(parentValue, node);
    }
  });

  return tempNodes.reduce((trees: T[], node: T) => {
    if (node[parentKey] === undefined
      || node[parentKey] === null
    ) {
      node[childrenKey] = [] as unknown as T[keyof T];
      trees.push(node);
      return trees;
    }

    const parentValue = node[parentKey];
    if (!parentMap.has(parentValue)) {
      return trees;
    }

    const parent = parentMap.get(parentValue);
    if (!parent[childrenKey]) {
      parent[childrenKey] = [node] as unknown as T[keyof T];
    } else {
      (parent[childrenKey] as unknown as T[]).push(node);
    }
    return trees;
  }, []);
}

export interface TreeOption<T> {
  key: keyof T,
  parentKey: keyof T,
  childrenKey: keyof T,
}
