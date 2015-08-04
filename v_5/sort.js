var Sort = (function () {
	var merge = (function merge(left, right, attribute) {
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (left[0][attribute] <= right[0][attribute]) {
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
	this.mergeSort = (function mergeSort(arr, attribute) {
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    var res = merge(mergeSort(left, attribute), mergeSort(right, attribute), attribute);
	    return res;
	});
	this.bubbleSort = (function bubble(inputArray, attribute) {
	    var sortArray = inputArray.slice(0);
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
	this.insertionSort = (function insertion(inputArray, attribute) {
		var sortArray = inputArray.slice(0);
	    var length = sortArray.length;
	    for (var i = 1; i < length; i++) {
	        for (var j = 0; j < i; j++)
	            if (sortArray[j][attribute] > sortArray[i][attribute]) {
	                var temp = sortArray[i];
	                var k = i;
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