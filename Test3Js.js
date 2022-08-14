const body = document.body;
        
var sudoku = [
    [4, 0, 9, 0, 0, 8, 0, 3, 0],
    [7, 5, 0, 0, 3, 2, 0, 1, 8],
    [0, 0, 0, 5, 0, 0, 2, 0, 6],
    [8, 0, 0, 0, 0, 3, 9, 0, 0],
    [0, 3, 0, 0, 4, 0, 0, 7, 5],
    [0, 0, 1, 2, 0, 7, 0, 0, 0],
    [0, 0, 8, 4, 0, 0, 0, 0, 9],
    [0, 1, 0, 0, 0, 9, 0, 4, 0],
    [2, 0, 0, 7, 1, 0, 8, 5, 0]
]

function tableCreate() {
    tbl = document.createElement("table");
    
    for(let i = 0; i < 9; i++) {
        const tr = tbl.insertRow();
        for(let j = 0; j < 9; j++) {
            const td = tr.insertCell();
            td.style.border = '1px solid black';
            td.setAttribute('id', ''+i+''+j)
        }
    }
    body.appendChild(tbl);
}

tableCreate();
display(sudoku);
    
function display(s) {
    for(let i = 0; i < s.length; i++) {
        for(let j = 0; j < s[0].length; j++) {
            setTimeout(() => {
                print(s, i, j);
            }, 900 * i + 100 * j);
        }
    }
}

function print(s, i, j) {
    var cell = document.getElementById(''+i+''+j);
    if(s[i][j] == 0) {
        cell.innerHTML = ' ';
        return
    }
    cell.innerHTML = sudoku[i][j];
}

var clicked = 0;

function solveSudoku(s) {
    if(clicked == 0) {
        clicked = 1;
        document.getElementById('btn').disabled = true;
    }
    for(let i = 0; i < s.length; i++) {
        for(let j = 0; j < s[0].length; j++) {
            if(s[i][j] == 0) {
                for(let k = 1; k < 10; k++) {
                    if(checkInBox(i, j, k, s) && checkInX(i, k, s) && checkInY(j, k, s)) {
                        s[i][j] = k;
                        display(s);
                        if(solveSudoku(s)) {
                            let flag = true;
                            for(let a = 0; a < 9; a++) {
                                for(let b = 0; b < 9; b++) {
                                    if(s[a][b] == 0) {
                                        flag = false
                                    }
                                }
                            }
                            if(flag) {
                                display(s);
                                return;
                            }

                            s[i][j] = 0;
                        }
                    }  
                }
                return true;
            }
        }
    }
}

function checkInBox(a, b, num, s) {
    let hor = Math.floor(a / 3) * 3;
    let ver = Math.floor(b / 3) * 3;
    for(let i = hor; i < hor + 3; i++) {
        for(let j = ver; j < ver + 3; j++) {
            if(s[i][j] == num) {
                return false;
            }
        }
    }
    return true;
}

function checkInX(a, num, s) {
    for(let i = 0; i < 9; i++) {
        if(s[a][i] == num) {
            return false;
        }
    }
    return true;
}

function checkInY(b, num, s) {
    for(let i = 0; i < 9; i++) {
        if(s[i][b] == num) {
            return false;
        }
    }
    return true;
}

