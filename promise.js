Promise.prototype.then = function(onResolved, onRejected) {
    var self = this
    var promise2
  
    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) {}
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {}
  
    if (self.status === 'resolved') {
      // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
      // 因为考虑到有可能throw，所以我们将其包在try/catch块里
      return promise2 = new Promise(function(resolve, reject) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
            x.then(resolve, reject)
          }
          resolve(x) // 否则，以它的返回值做为promise2的结果
        } catch (e) {
          reject(e) // 如果出错，以捕获到的错误做为promise2的结果
        }
      })
    }
  
    // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
    if (self.status === 'rejected') {
      return promise2 = new Promise(function(resolve, reject) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    }
  
    if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
      return promise2 = new Promise(function(resolve, reject) {
        self.onResolvedCallback.push(function(value) {
          try {
            var x = onResolved(self.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
  
        self.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(self.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  }
  
  // 为了下文方便，我们顺便实现一个catch方法
  Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
  }