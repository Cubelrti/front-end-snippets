function quickSort(array) {
    var _quicksort = function(left, right, arr) {
        if (left > right) return arr;
        let pivot = arr[left];
        let i = left;
        let j = right;
        while (i != j) {
            while (arr[j] >= pivot && i < j) j--;
            while (arr[i] <= pivot && i < j) i++;
            if (i < j) 
                [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        arr[left] = arr[i];
        arr[i] = pivot;
        _quicksort(left, i - 1, arr);
        _quicksort(i + 1, right, arr);
        return arr;
    }
    return _quicksort(0, array.length - 1, array);
}

let array = [4, 3, 2, 5, 243, 1123, 423, 53, 123, 345, 63, 234, 64];
let sorted = quickSort(array);
console.log(sorted);