/**
 * Swaps the index values of an array.
 * Calls onSwap callback if it is a function.
 */
function swap(array, leftIndex, rightIndex, onSwap) {
    let temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    
    if (typeof onSwap === "function") {
        onSwap(array);
    }
}

/** 
 * Functions selects the pivot as the middle index of an array.
 * Loops through and compares values, if left is larger than right, swap is called
 */
function partition(array, left, right, onSwap) {
    let pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            if(array[i] != array[j]) {
                swap(array, i, j, onSwap);
            }
            i++;
            j--;
        }
    }

    return i;
}

/** 
 * Recursive quicksort function. Runs partition if array is larger than 1.
 * If left is less than the returned index-1, there are still items on the left to be sorted.
 * If index is less than right, there are items on the right to be sorted.
 * Retruns result array.
 */ 
function quickSort(array, left, right, onSwap) {
    let index;

    if (array.length > 1) {
        index = partition(array, left, right, onSwap);

        if (left < index - 1) {
            quickSort(array, left, index - 1, onSwap);
        }

        if (index < right) {
            quickSort(array, index, right, onSwap);
        }
    }

    return array;
}

// export quicksort function
module.exports = quickSort;
