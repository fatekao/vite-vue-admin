/**
 * 将树结构数据扁平化处理。
 * @param {Object[]} tree 原始的树结构数据，每个节点包含一个标识该节点的键值对，以及可选的表示其子节点的键（默认为'children'）。
 * @param {string} childrenKey 表示子节点的键名，默认为'children'。如果原始数据中使用不同的键名来表示子节点数组，则可以通过该参数指定。
 * @returns {Object[]} 返回一个扁平化的数组，包含原始树结构中所有的节点，每个节点都不再包含其子节点信息。
 */
export function flattenTree(tree, childrenKey = 'children') {
  const result = []

  // 遍历树结构的递归函数
  function traverse(arr) {
    arr.forEach(item => {
      const { [childrenKey]: children, ...data } = item // 解构出子节点数组和当前节点的其它属性
      result.push(data) // 将当前节点（不包含子节点）添加到结果数组中
      if (children && children.length) {
        traverse(children)
      }
    })
  }

  traverse(tree)

  return result
}
/**
 * 清洗树，将树结构数据中的每个节点的属性进行清洗，并返回一个干净的树结构数据。
 *
 * @export
 * @param {*} tree 树结构数据
 * @param {*} callback 回调函数，用于对每个节点进行清洗，返回一个新的节点对象。
 * @param {string} [childrenKey='children'] 表示子节点的键名，默认为'children'。如果原始数据中使用不同的键名来表示子节点数组，则可以通过该参数指定。
 * @param {string} [newChildrenKey='children'] 表示新子节点的键名，默认为'children'。如果希望返回的树结构数据使用不同的键名来表示子节点数组，则可以通过该参数指定。
 * @return {*}
 */
export function cleanTree(tree, callback, childrenKey = 'children', newChildrenKey = 'children') {
  const traverse = tree => {
    const result = []
    tree.forEach(node => {
      const { [childrenKey]: children, ...item } = node
      const newNode = callback(item)
      if (children && children.length) {
        newNode[newChildrenKey] = traverse(children)
      }
      result.push(newNode)
    })
    return result
  }

  return traverse(tree)
}
