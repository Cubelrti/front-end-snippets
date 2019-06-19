function deepClone(obj, hash = new WeakMap()) {
    if (Object(obj) === obj) return obj;
    if (hash.get(obj)) return hash.get(obj);
    var result = obj instanceof Date ? new Date(obj)
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
            : obj.constructor ? new obj.constructor()
                : Object.create(null);
    hash.set(obj, result);
    if (obj instanceof Map)
        Array.from(obj, ([k, v]) => result.set(k, deepClone(v, hash)));
    return Object.assign(result, ...Object.keys(obj).map(key => ({ [key]: deepClone(obj[key], hash) })));
}


// Sample data
var p = {
    data: 1,
    children: [{
      data: 2,
      parent: null
    }]
  };
  p.children[0].parent = p;
  
  var q = deepClone(p);
  
  console.log(q.children[0].parent.data); // 1