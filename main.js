//获取棋盘中的数字排名
function get_size_rank(board){
    let box = []

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (box.includes(board[i][j]) || board[i][j] == 0){
                continue
            }else{
                box.push(board[i][j])
            }
        }
    }

    if (box[Math.floor(Math.random() * box.length)] == undefined){
        return 2
    }
    
    return box[Math.floor(Math.random() * box.length)]
}

function set_block_style(block, value){
    if (value == 0){
        block.style.backgroundColor = "rgba(238, 228, 218, 0.35)"

        block.innerHTML = ""
    }else if (value == 2){
        block.style.backgroundColor = "#eee4da";
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);"

        block.innerHTML = 2
    }else if (value == 4){
        block.style.color = "#776e65"
        block.style.backgroundColor = "#ede0c8"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);"

        block.innerHTML = 4
    }else if (value == 8){
        block.style.backgroundColor = "#f2b179"
        block.style.color = "#f9f6f2"

        block.innerHTML = 8
    }else if (value == 16){
        block.style.backgroundColor = "#f59563"
        block.style.color = "#f9f6f2"

        block.innerHTML = 16
    }else if (value == 32){
        block.style.backgroundColor = "#f67c5f"
        block.style.color = "#f9f6f2"

        block.innerHTML = 32
    }else if (value == 64){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#f65e3b"

        block.innerHTML = 64
    }else if (value == 128){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edcf72"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286)"
        block.style.fontSize = "25px"

        block.innerHTML = 128
    }else if (value == 256){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edcc61"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)"
        block.style.fontSize = "25px"

        block.innerHTML = 256
    }else if (value == 512){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc850"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)"
        block.style.fontSize = "25px"

        block.innerHTML = 512
    }else if (value == 1024){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc53f"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)"
        block.style.fontSize = "15px"

        block.innerHTML = 1024
    }else if (value == 2048){
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc22e"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)"
        block.style.fontSize = "15px"

        block.innerHTML = 2048
    }else{
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#3c3a32"
        block.style.fontSize = "10px"

        block.innerHTML = value
    }
}

class Board{
    constructor(){
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]

        this.future_block = [2]
        this.draw(this.board)
    }

    // 生成方块
    generate_block(position){
        let block = get_size_rank(this.board)
        this.future_block.unshift(block)

        if (this.board[0][position] == 0){
            this.board[0][position] = this.future_block[1]

            //深拷贝
            let first_board = JSON.parse(JSON.stringify(this.board))
            
            for (let i = 1; i < 4; i++) {
                if (this.board[i][position] == 0){
                    this.board[i][position] = this.board[i - 1][position]
                    this.board[i - 1][position] = 0
                }else if (this.board[i][position] == this.board[i - 1][position]){
                    this.board[i][position] *= 2
                    this.board[i - 1][position] = 0
                }else{
                    break
                }
            }

            //返回两个关键帧
            return [first_board, this.board]
        }
    }

    force(direction){
        if (direction == "left"){
            //循环4行
            for (let y = 0; y < 4; y++) {
                //相对4个方块
                for (let x = 3; x > 0; x--){
                    for (let k = 0; k < x; k++){
                        if (this.board[y][k] == 0 && this.board[y][k + 1] != 0){
                            this.board[y][k] = this.board[y][k + 1]
                            this.board[y][k + 1] = 0 
                        }else if (this.board[y][k] == this.board[y][k + 1]){
                            this.board[y][k] *= 2
                            this.board[y][k + 1] = 0
                        }
                    }
                }
            }
        }else if (direction == "right"){
            //循环4行
            for (let y = 0; y < 4; y++){
                //相对4个方块
                for (let x = 0; x < 4; x++){
                    for (let k = 3; k > x; k--){
                        if (this.board[y][k] == 0 && this.board[y][k - 1] != 0){
                            this.board[y][k] = this.board[y][k - 1]
                            this.board[y][k - 1] = 0
                        }else if (this.board[y][k] == this.board[y][k - 1]){
                            this.board[y][k] *= 2
                            this.board[y][k - 1] = 0
                        }
                    }
                }
            }
        }
        
        let first_board = JSON.parse(JSON.stringify(this.board))

        //重力执行
        for (let x = 0; x < 4; x++){
            for (let y = 0; y < 4; y++){
                for (let k = 3; k > y; k--){
                    if (this.board[k][x] == 0 && this.board[k - 1][x] != 0){
                        this.board[k][x] = this.board[k - 1][x]
                        this.board[k - 1][x] = 0
                    }else if (this.board[k][x] == this.board[k - 1][x]){
                        this.board[k][x] *= 2
                        this.board[k - 1][x] = 0
                    }
                }
            }
        }

        return [first_board, this.board]
    }

    draw(content){
        //设置未来的方块样式
        let future_block = document.getElementById('future-block')
        set_block_style(future_block, this.future_block[0])

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let value = content[i][j]
                let block = document.getElementById(`row${i}-${j}`);

                set_block_style(block, value)
            }
        }
    }
}

let board = new Board()

document.getElementById("fall-0").addEventListener("click", function(){
    let result = board.generate_block(0)
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})

document.getElementById("fall-1").addEventListener("click", function(){
    let result = board.generate_block(1)
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})

document.getElementById("fall-2").addEventListener("click", function(){
    let result = board.generate_block(2)
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})

document.getElementById("fall-3").addEventListener("click", function(){
    let result = board.generate_block(3)
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})

document.getElementById("force-left").addEventListener("click", function(){
    let result = board.force("left")
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})

document.getElementById("force-right").addEventListener("click", function(){
    let result = board.force("right")
    setTimeout(() => {
        board.draw(result[0])
    })
    setTimeout(() => {
        board.draw(result[1])
    }, 250)
})
