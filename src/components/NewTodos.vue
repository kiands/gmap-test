<template>
    <div id="newTodos">
        <input @keyup.enter="addTodo()" v-model="content" />
        <button @click="addTodo()">add</button>
        <ul v-if="todos.length > 0">
            <!--index属性本身就存在；v-bind中，completed可改变真/假的状态。真即存在此style，假即不存在-->
            <li class="list-group-item"
                :key="index"
                v-for="(todo,index) in todos"
                v-bind:class="{ 'completed' : todo.completed }"
            >
                {{todo.content}}
                <input v-model="todo.content" v-if="todo.editing"/>
                <button @click="editTodo(index, todo.content)" v-if="!todo.editing">edit</button>
                <button @click="submitTodo(index, todo.content)" v-if="todo.editing">submit</button>
                <button class="btn btn-xs pull-right" 
                    v-bind:class="[todo.completed ? 'btn-danger' : 'btn-success']"
                    v-on:click="toggleCompletion(todo)"
                >
                    {{ todo.completed ? 'undo' : 'completed' }}
                </button>
                <!--delete方法需要用到todo（主要是删除需要使用todo.id）-->
                <button class="btn btn-warning btn-xs pull-right" v-on:click="deleteTodo(index, todo)">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>

<style>
	.completed {
		color: #5cb85c;
		text-decoration: line-through;
	}
</style>

<script>
	export default{
        name: 'NewTodos',

        data () {
            return {
                content: null,
                todos: []
            }
        },

        computed: {
            todoCount() {
                return this.todos.length; //显示有几条todo
            }
        },
        
		methods: {
			addTodo: function () {
                this.todos.push({content:this.content,completed:false,editing:false})
                //傳遞
                this.$emit('parentShow',this.content)
                //要傳遞content，就要在歸零之前傳出去
                this.content = null
            },
            editTodo: function (index,content) {
                this.todos[index].editing = true
            },
            submitTodo: function (index,content) {
                this.todos[index].content = content
                this.todos[index].editing = false
            },
			deleteTodo: function (index, todo) {
				this.todos.splice(index,1) //从index号开始删除，删除1个
			},
			toggleCompletion: function (todo) {
				todo.completed = ! todo.completed
			},
		}
	}
</script>