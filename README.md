# #golden-tiger/tree

## Tree.from

Construct trees from flatten data.

1. @param1 nodes: Tree node array

2. @param2 option:
option.key: unique property's name for node
option.parentKey: unique property's name for parent node
option.childrenKey: unique property's name for children node

```js
const a = [
  { id: 0, parentId: undefined },
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
//     {
//         "id": 0,
//         "children": [
//             {
//                 "id": 1,
//                 "parentId": 0,
//                 "children": [
//                     {
//                         "id": 11,
//                         "parentId": 1
//                     },
//                     {
//                         "id": 12,
//                         "parentId": 1
//                     }
//                 ]
//             },
//             {
//                 "id": 2,
//                 "parentId": 0,
//                 "children": [
//                     {
//                         "id": 21,
//                         "parentId": 2
//                     },
//                     {
//                         "id": 22,
//                         "parentId": 2
//                     }
//                 ]
//             }
//         ]
//     }
// ]
```

## Tree.traverse

Traverse a tree in pre-order or post-order.

1. @param1 tree: tree root
2. @param2 reducer: Handler function with parameter of current tree and accumulator state. If handler function returns false, it will terminate the traverse flow.
3. @param3 option
option.childrenKey: specify the tree's children key (default value: 'children').
option.order: ['pre'|'post'], traverse a tree in pre-order or post-order.
option.state: the state when traverse.

```js
// use pre-order traverse
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
// [ 0, 1, 11, 12, 2, 21, 22 ]

// use post-order traverse
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
// [ 11, 12, 1, 21, 22,  2, 0 ]

// use terminable traverse
const terminableState = Tree.traverse(trees[0], (node, state) => {
  state.traveled.push(node.id);
  if (node.id === 12) {
    return false;
  }
}, {
  state: {
    traveled: [],
  },
});
console.log(terminableState);
// { traveled: [ 0, 1, 11, 12 ] }
```
