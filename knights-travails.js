let queue = [];
let visited = [];

function possibleMoves(location){
    let moves = [
        [location[0] + 2, location[1] + 1],
        [location[0] + 1, location[1] + 2],
        [location[0] + 2, location[1] - 1],
        [location[0] + 1, location[1] - 2],
        [location[0] - 2, location[1] + 1],
        [location[0] - 1, location[1] + 2],
        [location[0] - 2, location[1] - 1],
        [location[0] - 1, location[1] - 2]];
    for(let i = 0; i < moves.length; i++){
        if(offBoard(moves[i])){
            moves.splice(i, 1);
            i--;
        }
    }
    return moves;
}

function knightMoves(start, end){
    if(offBoard(end) || offBoard(start)){
        console.log('Invalid inputs');
        return;
    }
    queue = [];
    queue.push({value: start, prev: null});
    let node = breadthFirstSearch(queue[0], end);
    let output = [];
    output.push(node.value);
    while(node.prev !== null){
        output.unshift(node.prev.value);
        node = node.prev;
    }
    console.log(`You made it in ${output.length - 1} moves! Here's your path:`)
    output.forEach((item) => {console.log(item)});
}

function breadthFirstSearch(node, end){
    let value = queue.shift();
    visited.push(node.value);
    let moves = possibleMoves(node.value);
    moves.forEach((move) => {
        move = {value: move, prev: node}
        if(!visited.some((visitedNode) => {visitedNode[0] === move.value[0] && visitedNode[1] === move.value[1]})){
            queue.push(move);
        }
    });
    if(node.value[0] === end[0] && node.value[1] === end[1]){
        return node;
    } else{
        return breadthFirstSearch(queue[0], end);
    }
}

function offBoard(space){
    if(space[0] > 8 || space[0] < 1 || space[1] > 8 || space[1] < 1) return true;
    else return false;
}

knightMoves([1,1], [4,4]);
knightMoves([4,4], [1,1]);
knightMoves([3,3],[4,3]);
knightMoves([8,8],[1,1]);