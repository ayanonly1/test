var Sort = (function () {
	var merge = (function merge(left, right) {
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (left[0] <= right[0]) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	 
	    while (left.length)
	        result.push(left.shift());
	 
	    while (right.length)
	        result.push(right.shift());
	 
	    return result;
	});
	this.mergeSort = (function mergeSort(arr) {
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    var res = merge(mergeSort(left), mergeSort(right));
	    return res;
	});
	this.bubbleSort = (function bubble(sortArray, attribute) {
	    var length = sortArray.length;
	    for (var i = 0; i < length; i++) {
	        for (var j = 0; j < length - 1; j++) {
	            if (sortArray[j][attribute] > sortArray[j + 1][attribute]) {
	                var temp = sortArray[j + 1];
	                sortArray[j + 1] = sortArray[j];
	                sortArray[j] = temp;
	            }
	        }
	    }
	    return sortArray;
	});
	this.insertionSort = (function insertion(inputArray) {
	    var sortArray = inputArray.slice(0);
	    var length = sortArray.length;
	    for (i = 1; i < length; i++) {
	        for (j = 0; j < i; j++)
	            if (sortArray[j] > sortArray[i]) {
	                temp = sortArray[i];
	                k = i;
	                while (k != j) {
	                    sortArray[k] = sortArray[k - 1];
	                    k--;
	                }
	                sortArray[j] = temp;
	            }
	    }
	    return sortArray;
	});
});

//Testing Part
// var obj = new Sorting();
// var unsorted = [987, 765, 215, 476, 398, 10, 187, 97, 65, 876, 23, 9];
// var sorted = obj.insertionSort(unsorted);
// console.log(unsorted);
// console.log(sorted);