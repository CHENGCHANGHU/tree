# #golden-tiger/tree

## Using

```js
import Tree from '@golden-tiger/tree'; // mjs
const Tree = require('@golden-tiger/tree'); // cjs
```

## Tree.from

Construct trees from flatten data.

1. @param1 nodes: Tree node array

2. @param2 option:
option.key: unique property's name for node.
option.parentKey: unique property's name for parent node. When this value is `null` or `undefined`, it will be a root node.
option.childrenKey: unique property's name for children node.

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
2. @param2 reducer: Handler function with parameters of current tree node, accumulator state and current tree's parent node. If handler function returns false, it will terminate the traverse flow.
3. @param3 option
option.childrenKey: specify the tree's children key (default value: 'children').
option.order: [`'pre'`|`'post'`|`'pre-reverse'`|`'post-reverse'`], traverse a tree in pre-order, post-order, pre-order-reverse, or post-order-reverse.
option.state: the state when traverse.

### `pre`

```js
// use pre-order traverse
const preOrderState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state, parent) => {
  state.result.push(node.id);
  return state;
}, {
  order: 'pre', // pre-order
  state: preOrderState,
}));
console.log(preOrderState.result);
// [ 0, 1, 11, 12, 2, 21, 22 ]
```

### `pre-reverse`

```js
// use pre-order-reverse traverse
const preOrderReverseState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state, parent) => {
  state.result.push(node.id);
}, {
  order: 'pre-reverse',
  state: preOrderReverseState,
}));
console.log(JSON.stringify(preOrderReverseState.result));
// [ 0, 2, 22, 21, 1, 12, 11 ]
```

### `post`

```js
// use post-order traverse
const postOrderState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state, parent) => {
  state.result.push(node.id);
  return state;
}, {
  order: 'post', // post-order
  state: postOrderState,
}));
console.log(postOrderState.result);
// [ 11, 12, 1, 21, 22,  2, 0 ]
```

### `post-reverse`

```js
// use post-order-reverse traverse
const postOrderReverseState = {
  result: [],
};
trees.forEach(tree => Tree.traverse(tree, (node, state, parent) => {
  state.result.push(node.id);
}, {
  order: 'post-reverse',
  state: postOrderReverseState,
}));
console.log(JSON.stringify(postOrderReverseState.result));
// [ 22, 21, 2, 12, 11, 1, 0 ]
```

### terminable

```js
// use terminable traverse
const terminableState = Tree.traverse(trees[0], (node, state, parent) => {
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
