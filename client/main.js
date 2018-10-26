Vue.component('navbar',{
    template: `
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item">
            <h1>TODO</h1>
        </a>
    
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" @click="completedTask">
            Completed Tasks
            </a>
    
            <a class="navbar-item" @click="incompletedTask">
            Incompleted Tasks
            </a>

            <a class="navbar-item" @click="createTask">
            Create Task
            </a>
    
            </div>
        </div>
    
        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary">
                <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                Log in
                </a>
            </div>
            </div>
        </div>
        </div>
    </nav>
    `,

    methods: {
        completedTask() {
            this.$emit('status', 'complete')
        },

        incompletedTask() {
            this.$emit('status', 'incomplete')
        },

        createTask() {
            this.$emit('input-task')
        }
    }
})

Vue.component('todo',{
    template: `
    <div class="card container" >
        <header class="card-header">
        <p class="card-header-title">
            {{ todo.name }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </a>
        </header>
        <div class="card-content">
        <div class="content">
            {{ todo.description }}
        </div>
        </div>
        <footer class="card-footer">
        <a href="#" @click="$emit('complete')" class="card-footer-item" v-show="!todo.complete" >Done</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" @click="$emit('delete')"class="card-footer-item">Delete</a>
        </footer>
    </div>
    `,
    props: ['todo'],



})

Vue.component('todo-list',{
    template: `
        <div>
            <todo v-for="todo in todos" :todo="todo" @delete="deleteTask(todo)" @complete="completeTask(todo)"></todo>            
        </div>
    `,


    props: ['status','task'],

    data() {
        return {
            todos: [],
        }
    },
    methods: {
        deleteTask(task){
            axios.delete('http://localhost:3000/todo/delete', { data: {id: task._id} })
            .then(response => this.todos = this.todos.filter(item => item.name !== task.name))
        },

        completeTask(task){
            axios.patch(`http://localhost:3000/todo/complete/${task._id}`)
            .then(response => this.todos = response.data.tasks)
        }
    },
    created() {
        axios.get('http://localhost:3000/todo/todos?complete=false').then(response => this.todos = response.data.todos)
        console.log(this.status)
        console.log(this.task)
    },
    watch: {
        status(newValue) {
            // jika new Value == 'complete'
            // query ke database dapetin data semua todo yang complete
            // di assign ke dalam data todos
            if (newValue === 'complete') {
                axios.get('http://localhost:3000/todo/todos?complete=true')
                .then(response => this.todos = response.data.todos)
            } else {
                axios.get('http://localhost:3000/todo/todos?complete=false')
                .then(response => this.todos = response.data.todos)
            }
        },

        task() {
            axios.get('http://localhost:3000/todo/todos?complete=false')
            .then(response => this.todos = response.data.todos)
        }
    }

})

Vue.component('create-task',{
    template: `
        <div>
            <input class="input" type="text" placeholder="name of your task" v-model="taskName">
            <textarea class="textarea container" placeholder="task description" v-model="taskDescription"></textarea>
            <a class="button is-primary" @click="addTask">add</a>
        </div>
    `,
    props: ['task'],
    data() {
        return {
            taskDescription: '',
            taskName: ''
        }
    },
    methods: {
        addTask() {
            axios.post(`http://localhost:3000/todo/create`,{
                name: this.taskName,
                description: this.taskDescription
            })
            .then((response) => {
                this.taskName = '',
                this.taskDescription = ''
                this.$emit('task-done')
            })
        }
    }
})

new Vue({
    el: '#app',

    data: {
        status: '',
        task: false
    },

    methods: {
        changeStatus(status) {
            this.status = status
        },

        newTask() {
            this.task = true
        },
        removeTask() {
            this.task = false
        }
    }
})