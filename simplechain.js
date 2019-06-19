//JavaScript数组方法中有些不是返回被操作了的数组，所以需要链式调用的话可以这样实现
function ArrayChain(arr) {
    this.arr = arr;
  }

  ArrayChain.prototype = {
    shift: function() {
      this.arr.shift();
      return this;
    },
    push: function() {
      var arg = [].slice.call(arguments,0);
      arg.forEach(function(item) {
        this.arr.push(item);
      }, this)
      return this;
    },
    get: function() {
      return this.arr;
    }
  }

  var a=new ArrayChain([1,2,3]);
  a.shift().push(7,8,9).get()//[2,3,7,8,9]