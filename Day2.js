
const marks = [85, 92, 78, 96, 88, 91, 73, 99, 84, 87];


function findHighestWithForLoop(arr) {
    let highest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > highest) {
            highest = arr[i];
        }
    }
    return highest;
}

function findHighestWithWhileLoop(arr) {
    let highest = arr[0];
    let i = 1;
    while (i < arr.length) {
        if (arr[i] > highest) {
            highest = arr[i];
        }
        i++;
    }
    return highest;
}

function findHighestWithForEach(arr) {
    let highest = arr[0];
    arr.forEach(mark => {
        if (mark > highest) {
            highest = mark;
        }
    });
    return highest;
}

function findHighestWithMath(arr) {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

function findHighestWithReduce(arr) {
    return arr.reduce((highest, current) => {
        return current > highest ? current : highest;
    });
}

console.log("Original marks:", marks);
console.log("\nResults:");
console.log("For Loop:", findHighestWithForLoop(marks));
console.log("While Loop:", findHighestWithWhileLoop(marks));
console.log("ForEach Loop:", findHighestWithForEach(marks));
console.log("Math.max:", findHighestWithMath(marks));
console.log("Reduce:", findHighestWithReduce(marks));

function findHighestSafe(arr) {
    if (!arr || arr.length === 0) {
        return "No marks provided";
    }
    
    if (arr.length === 1) {
        return arr[0];
    }
    
    let highest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (typeof arr[i] === 'number' && arr[i] > highest) {
            highest = arr[i];
        }
    }
    return highest;
}

console.log("\nEdge Cases:");
console.log("Empty array:", findHighestSafe([]));
console.log("Single element:", findHighestSafe([75]));
console.log("With invalid data:", findHighestSafe([85, "invalid", 92, null, 78]));