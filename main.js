/* 显示屏类 */ 
class Screen{
    /**
     * 初始化
     * @param {Array} content 内容
     * @param {int} score 得分
     */
    constructor(){
        //初始化content
        this.content = [];
        for (let i = 0; i < 20; i++) {
            this.content.push([]);
            for (let j = 0; j < 20; j++){
                this.content[i].push(0);
            }
        }
        
        //初始化得分
        this.score = 0; 

        //初始化屏幕
        let screenDOM = document.querySelector("main");
        //初始化Main元素
        for (let i = 0; i < 20; i++) {
            //创建一个容纳一行的元素
            let div_row = document.createElement("div");
            //设置class和ID, 用于Css
            div_row.className = "row";
            
            //添加20个列元素
            for (let j = 0; j < 20; j++){
                let div_column = document.createElement("div");
                //设置class和ID
                div_column.className = "column";
                div_column.id = `${i}-${j}`;

                //添加
                div_row.appendChild(div_column);
            }

            //添加
            screenDOM.appendChild(div_row);
        }
    }

    /**
     * 渲染屏幕
     * @param {Array} snack_in 贪吃蛇所在的方块
     * @param {Food} food 
     */
    render(child_list, food){
        //清空屏幕
        for (let i = 0; i < 20; i++){
            for (let j = 0; j < 20; j++){
                let div = document.getElementById(`${i}-${j}`);
                div.style.backgroundColor = "rgb(189, 189, 189)";
            }
        }

        //渲染贪吃蛇
        for (let i = 0; i < child_list.length; i++) {
            //获取要渲染的ID名
            let snake_child_id = `${child_list[i].x}-${child_list[i].y}`;            
            //设置DOM元素
            document.getElementById(snake_child_id).style.backgroundColor = "#c01c28";
        }

        console.log(`${food.x}-${food.y}`);
        //渲染食物
        document.getElementById(`${food.x}-${food.y}`).style.backgroundColor = "#f6d32d";
    }
}

class Food{
    /**
     * 食物
     * @param {int} x 坐标 X
     * @param {int} y 坐标 Y
     */
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * 刷新位置
     * @param {Snake} snake  Snake类
     */
    view(child_list){
        let new_x;
        let new_y;
        while (true){
            new_x = Math.random() * (20 - 0) + 0;
            new_y = Math.random() * (20 - 0) + 0;
            
            //转化成整数
            new_x = Math.floor(new_x);
            new_y = Math.floor(new_y)
            
            //判断是否不是生成在贪吃蛇的身体位置
            let is_breaked = true;
            for (let i = 0; i < child_list.length; i++) {
                let child = child_list[i];
                if (new_x == child.x && new_y == child.y){    //如果不在空位
                    is_breaked = false;  //保持不退出的状态
                }
            }
            if (is_breaked == true){
                break;
            }
        }
        this.x = new_x;
        this.y = new_y;
    }
}

//贪吃蛇的一节
class SnakeChild{
    /**
     * @param {int} x 坐标 X
     * @param {int} y 坐标 Y
     */
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//贪吃蛇全体
class Snake{
    constructor(screen, food){
        //贪吃蛇的所有小节
        this.child_list = [];
        //头部
        let head = new SnakeChild(9, 9, null);
        //添加到列表中
        this.child_list.push(head);
        //Screen类
        this.screen = screen;
        //现在的方向
        this.move_direction = "right";      //默认是向右
        //Food类
        this.food = food;
    }

    /**
     * 生长
     * @param {string} move_direction 此时移动的方向
     */
    grow(){
        //尾部
        let last_child = this.child_list[this.child_list.length - 1];
        let new_child = null;

        if (this.move_direction == "up"){
            new_child = new SnakeChild(last_child.x + 1, last_child.y);
        }else if (this.move_direction == "down"){
            new_child = new SnakeChild(last_child.x - 1, last_child.y);
        }else if (this.move_direction == "left"){
            new_child = new SnakeChild(last_child.x, last_child.y + 1);
        }else if (this.move_direction == "right"){
            new_child = new SnakeChild(last_child.x, last_child.y - 1);
        }

        //添加新实例和渲染
        this.child_list.push(new_child);
    }

    /**
     * 移动
     * @param {string} direction 方向
     * @param {Screen} screen    Screen类
     */
    move(direction){
        let former_locations = [];  //作为队列, 存储从头到尾每一节移动前的位置
        let head = this.child_list[0];  //头部节点
        //头部先移动, 后面的跟上去
        former_locations.push([head.x, head.y]);

        //头部进行移动
        if (direction == "up" && this.move_direction != "down"){
            this.move_direction = "up";
            if (head.x == 0){       //处理越界问题
                head.x = 19;
            }else{
                head.x -= 1;
            }
        }else if (direction == "down" && this.move_direction != "up"){
            this.move_direction = "down";
            if (head.x == 19){
                head.x = 0;
            }else{
                head.x += 1;
            }
        }else if (direction == "left" && this.move_direction != "right"){
            this.move_direction = "left";
            if (head.y == 0){
                head.y = 19;
            }else{
                head.y -= 1;
            }
        }else if (direction == "right" && this.move_direction != "left"){
            this.move_direction = "right";
            if (head.y == 19){
                head.y = 0;    
            }else{
                head.y += 1;
            }
        }else{  //不符合以上条件, 也就是掉头了, 那么按照当前方向继续走
            if (this.move_direction == "up"){
                if (head.x == 0){
                    head.x = 19;
                }else{
                    head.x -= 1;
                }
            }else if (this.move_direction == "down"){
                if (head.x == 19){
                    head.x = 0;
                }else {
                    head.x += 1;
                }
            }else if (this.move_direction == "left"){
                if (head.y == 0){
                    head.y = 19;
                }else{
                    head.y -= 1;
                }
            }else if (this.move_direction == "right"){
                if (head.y == 19){
                    head.y = 0;
                }else{
                    head.y += 1;
                }
            }
        }

        if (head.x == food.x && head.y == food.y){      //如果吃到了食物
            //刷新食物
            food.view(this.child_list); 

            //生长贪吃蛇
            this.grow()   
        }

        for (let i = 1; i < this.child_list.length; i++) {
            let child = this.child_list[i];
            if (head.x == child.x && head.y == child.y){
                this.child_list = [head];
            }
        }

        //后面的一直要跟上去
        for (let i = 1; i < this.child_list.length; i++) {
            //当前节点对象
            let now = this.child_list[i];
            //获取上一个节点的原始位置
            let last_former = former_locations.shift();
            //记录自己现在移动前的初始位置
            former_locations.push([now.x, now.y]);
            //跟进当前节点到上一个节点
            now.x = last_former[0];
            now.y = last_former[1];
        }

        //渲染
        this.screen.render(this.child_list, this.food);
    }
}

let screen = new Screen();
let food = new Food(3, 12);
let snake = new Snake(screen, food);

direction = snake.move_direction;
//初始位置设置

setInterval(() => {
    document.addEventListener("keydown", function(event){
        if (event.key == "a"){
            direction = "left";
        }else if (event.key == "s"){
            direction = "down";
        }else if (event.key == "d"){
            direction = "right";
        }else if (event.key == "w"){
            direction = "up";
        }
    })
    snake.move(direction); 
}, 100);