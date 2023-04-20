# #golden-tiger/tree

## Tree.from

Construct trees from flatten data.

> @param1 nodes: Tree node array

> @param2 option:
> option.key: unique property's name for node
> option.parentKey: unique property's name for parent node
> option.childrenKey: unique property's name for children node

```js
const a = [
  { id: 1, parentId: 0 },
  { id: 11, parentId: 1 },
  { id: 12, parentId: 1 },
  { id: 2, parentId: 0 },
  { id: 21, parentId: 2 },
  { id: 22, parentId: 2 },
];

// construct trees from flatten data
const trees = Tree.from(a, { key: 'id', parentKey: 'parentId' });
console.log(JSON.stringify(trees, null, 4));
// [
//   {
//       "id": 1,
//       "parentId": 0,
//       "children": [
//           {
//               "id": 11,
//               "parentId": 1
//           },
//           {
//               "id": 12,
//               "parentId": 1
//           }
//       ]
//   },
//   {
//       "id": 2,
//       "parentId": 0,
//       "children": [
//           {
//               "id": 21,
//               "parentId": 2
//           },
//           {
//               "id": 22,
//               "parentId": 2
//           }
//       ]
//   }
// ]
```

## Tree.traverse

Traverse a tree in pre-order or post-order.

> @param1 tree: tree root
> @param2 reducer: handler function with parameter of current tree and accumulator state
> @param option
> option.childrenKey: specify the tree's children key (default value: 'children').
> option.order: ['pre'|'post'], traverse a tree in pre-order or post-order.
> option.state: the state when traverse.

```js
const preOrderState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state) => {
  state.result.push(node.id);
  return state;
}, {
  order: 'pre', // pre-order
  state: preOrderState,
}));
console.log(preOrderState.result);
// [ 1, 11, 12, 2, 21, 22 ]

const postOrderState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state) => {
  state.result.push(node.id);
  return state;
}, {
  order: 'post', // post-order
  state: postOrderState,
}));
console.log(postOrderState.result);
// [ 11, 12, 1, 21, 22, 2 ]
```
