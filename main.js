function set_block_style(block, value) {     //设置方块样式
    if (value === 0) {
        block.style.color = "#776e65"
        block.style.boxShadow = ""
        block.style.backgroundColor = "rgba(238, 228, 218, 0.35)"
        block.style.fontSize = "30px"

        block.innerHTML = ""
    } else if (value === 2) {
        block.style.color = "#776e65"
        block.style.backgroundColor = "#eee4da";
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);"
        block.style.fontSize = "30px"

        block.innerHTML = 2
    } else if (value === 4) {
        block.style.color = "#776e65"
        block.style.backgroundColor = "#ede0c8"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);"
        block.style.fontSize = "30px"

        block.innerHTML = 4
    } else if (value === 8) {
        block.style.backgroundColor = "#f2b179"
        block.style.color = "#f9f6f2"
        block.style.fontSize = "30px"

        block.innerHTML = 8
    } else if (value === 16) {
        block.style.backgroundColor = "#f59563"
        block.style.color = "#f9f6f2"
        block.style.fontSize = "30px"

        block.innerHTML = 16
    } else if (value === 32) {
        block.style.backgroundColor = "#f67c5f"
        block.style.color = "#f9f6f2"
        block.style.fontSize = "30px"

        block.innerHTML = 32
    } else if (value === 64) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#f65e3b"
        block.style.fontSize = "30px"

        block.innerHTML = 64
    } else if (value === 128) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edcf72"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286)"
        block.style.fontSize = "25px"

        block.innerHTML = 128
    } else if (value === 256) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edcc61"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)"
        block.style.fontSize = "25px"

        block.innerHTML = 256
    } else if (value === 512) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc850"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)"
        block.style.fontSize = "25px"

        block.innerHTML = 512
    } else if (value === 1024) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc53f"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)"
        block.style.fontSize = "15px"

        block.innerHTML = 1024
    } else if (value === 2048) {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#edc22e"
        block.style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)"
        block.style.fontSize = "15px"

        block.innerHTML = 2048
    } else if (typeof value === "string" && value.charAt(0) === 'b') {
        block.style.color = "#f5bf0eff"
        block.style.backgroundColor = "#ed442eff"
        block.style.fontSize = "30px"

        block.innerHTML = value.toUpperCase();
    }
    else {
        block.style.color = "#f9f6f2"
        block.style.backgroundColor = "#3c3a32"
        block.style.fontSize = "10px"

        block.innerHTML = value
    }
}

//获取棋盘中的数字排名
function get_size_rank() {
    let box = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4,
        'b2', 'b2', 'b2',
        'b4', 'b4', 'b4',
        'b8', 'b8', 'b8',
    ]

    const value = box[Math.floor(Math.random() * box.length)]
    return value;
}

function play_animation(animation_list, board, type){
    const speed = {
        'generate': 80,
        'force': 50
    }

    if (type === "generate"){
        const music = new Audio("generate.mp3")
        music.play()        
    }else if (type == "force"){
        const music = new Audio("force.mp3")
        music.play()
    }

    if (animation_list.length > 0) {     //有变化执行动画
        //更新次数
        board.times += 1
        document.getElementById("times-number").setHTMLUnsafe(board.times)

        if (animation_list[0].length == 2){
            board.draw(animation_list[0][0])   //绘画第一帧(无延迟)
        }else{
            board.draw(animation_list[0])   //绘画第一帧(无延迟)
        }

        //逐帧绘制
        for (let i = 1; i < animation_list.length; i++) {
            if (animation_list[i].length === 2){   //如果为数组
                setTimeout(() => {
                    board.draw(animation_list[i][0])    //动画帧在这个数组中下标0
                    //播放音效
                    const music = new Audio(`${animation_list[i][1]}.mp3`)
                    music.play()
                }, i * speed[type])
            }else{
                setTimeout(() => {
                    board.draw(animation_list[i])
                }, i * speed[type]);
            }
        }

        //最后一帧更新计分板
        setTimeout(() => {
            document.getElementById("score-number").setHTMLUnsafe(board.score);
        }, animation_list.length * speed[type])
    }
}

class boardAnimation {
    //动画类
    constructor() {
        this.animation_list = []    //存储所有帧
    }

    add_animation(content, type=0) {
        //添加动画帧
        
        //深拷贝
        content = JSON.parse(JSON.stringify(content))

        if (type !== 0){    //增加说明，用于音效控制
            this.animation_list.push([content, type])
        }else{
            this.animation_list.push(content);
        }
    }

    get_animation() {
        //返回动画帧
        return this.animation_list;
    }
}

class Board {
    constructor() {
        //游戏棋盘
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]

        this.future_block = [2]     //未来方块
        this.score = 0
        this.times = 0

        this.draw(this.board)       //初始化绘画
    }

    // 生成方块
    generate_block(position) {
        const board_animation = new boardAnimation()    //创建动画库

        if (this.board[0][position] == 0) {  //判断最顶部的地方是否为空
            const block = get_size_rank()   //获取生成的方块
            this.future_block.unshift(block)    //添加到未来方块列表的最前面

            this.board[0][position] = this.future_block.pop()   //移出
            board_animation.add_animation(this.board)   //添加第1帧

            for (let i = 1; i < 4; i++) {
                if (this.board[i][position] == 0) {
                    this.board[i][position] = this.board[i - 1][position]
                    this.board[i - 1][position] = 0     //进行普通下落操作

                    //添加动画库
                    board_animation.add_animation(this.board)
                } else if (this.board[i][position] == this.board[i - 1][position] && this.board[i][position] != 0) {
                    this.board[i][position] *= 2
                    this.board[i - 1][position] = 0

                    this.score += this.board[i][position];  //增加分数

                    //添加动画库
                    board_animation.add_animation(this.board, 'synthesize')
                } else {  //无法下落(底部有方块的状态)
                    if (typeof this.board[i - 1][position] === 'string' && this.board[i - 1][position].charAt(0) === 'b') {
                        this.boom(i, position, board_animation);
                    }else{
                        board_animation.add_animation(this.board)   //添加正常动画
                    }
                    break
                }
            }

            //判断是否最底部也有炸弹
            if (typeof this.board[3][position] === 'string' && this.board[3][position].charAt(0) === 'b'){
                this.boom(4, position, board_animation);
            }
        }

        return board_animation.get_animation()
    }

    boom(i, position, board_animation){
        //炸弹爆炸
        const injury_number = parseInt(this.board[i - 1][position].charAt(1))   //获取炸弹的威力数值
        //3x3范围爆炸
        for (let row = i - 2; row <= i; row++) {
            for (let column = position - 1; column <= position + 1; column++) {
                //排除炸弹位置
                try{    //获取越界的错误
                    if (row == i - 1 && column == position || this.board[row][column] === 0) {
                        continue
                    }
                }catch(error){  //跳过
                    continue
                }

                if (this.board[row][column] > injury_number) {           //进行相除
                    //分数减少掉方块被减少的数字
                    this.score -= (this.board[row][column] - this.board[row][column] / injury_number) 

                    this.board[row][column] /= injury_number
                    board_animation.add_animation(this.board, "boom")   //添加动画帧
                } else if (this.board[row][column] <= injury_number) {    //<=威力：为0
                    //分数减少掉整个方块
                    this.score -= this.board[row][column]

                    this.board[row][column] = 0
                    board_animation.add_animation(this.board, "boom")   //添加动画帧
                }
            }
        }
        //炸弹清除
        this.board[i - 1][position] = 0
        board_animation.add_animation(this.board, "boom")   //添加动画帧
        //进行一次重力
        this.force("gravity")
        board_animation.add_animation(this.board)   //添加动画帧
    }

    force(direction) {
        const board_animation = new boardAnimation()    //创建动画库

        if (direction == "left") {
            //循环4行
            for (let y = 0; y < 4; y++) {
                //相对4个方块
                for (let x = 3; x > 0; x--) {
                    for (let k = 0; k < x; k++) {
                        if (this.board[y][k] == 0 && this.board[y][k + 1] != 0) {
                            this.board[y][k] = this.board[y][k + 1]
                            this.board[y][k + 1] = 0

                            board_animation.add_animation(this.board);
                        } else if (this.board[y][k] == this.board[y][k + 1] && this.board[y][k] !== 0) {
                            this.board[y][k] *= 2
                            this.board[y][k + 1] = 0

                            this.score += this.board[y][k];     //增加分数

                            board_animation.add_animation(this.board, "synthesize");
                        }
                    }
                }
            }
        } else if (direction == "right") {
            //循环4行
            for (let y = 0; y < 4; y++) {
                //相对4个方块
                for (let x = 0; x < 4; x++) {
                    for (let k = 3; k > x; k--) {
                        if (this.board[y][k] == 0 && this.board[y][k - 1] != 0) {
                            this.board[y][k] = this.board[y][k - 1]
                            this.board[y][k - 1] = 0

                            board_animation.add_animation(this.board);
                        } else if (this.board[y][k] == this.board[y][k - 1] && this.board[y][k] != 0) {
                            this.board[y][k] *= 2
                            this.board[y][k - 1] = 0

                            this.score += this.board[y][k]

                            board_animation.add_animation(this.board, "synthesize");
                        }
                    }
                }
            }
        }

        //重力执行
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                for (let k = 3; k > y; k--) {
                    if (this.board[k][x] == 0 && this.board[k - 1][x] != 0) {
                        this.board[k][x] = this.board[k - 1][x]
                        this.board[k - 1][x] = 0

                        board_animation.add_animation(this.board);
                    } else if (this.board[k][x] == this.board[k - 1][x] && this.board[k][x] !== 0) {
                        this.board[k][x] *= 2
                        this.board[k - 1][x] = 0

                        this.score += this.board[k][x]

                        board_animation.add_animation(this.board, "synthesize");
                    }
                }
            }
        }

        return board_animation.get_animation()
    }

    draw(content) {
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

//创建棋盘对象
let board = new Board()
/*控制*/

document.getElementById("row0-0").addEventListener("click", function () {
    const result = board.generate_block(0)
    play_animation(result, board, "generate")
})

document.getElementById("row0-1").addEventListener("click", function () {
    const result = board.generate_block(1)
    play_animation(result, board, "generate")
})

document.getElementById("row0-2").addEventListener("click", function () {
    const result = board.generate_block(2)
    play_animation(result, board, "generate")
})

document.getElementById("row0-3").addEventListener("click", function () {
    const result = board.generate_block(3)
    play_animation(result, board, "generate")
})

document.getElementById("force-left").addEventListener("click", function () {
    const result = board.force("left");
    play_animation(result, board, "force")
})

document.getElementById("force-right").addEventListener("click", function () {
    const result = board.force("right");
    play_animation(result, board, "force")
})