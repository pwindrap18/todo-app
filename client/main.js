Vue.component('navbar', {
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
                <a class="button is-primary" @click="register" v-if="!isLogin">
                <strong>Sign up</strong>
                </a>
                <a class="button is-light" @click="$emit('login')" v-if=!isLogin>
                Log in
                </a>
                <a class="button is-light" @click="$emit('logout')" v-if="isLogin">
                Log Out
                </a>
            </div>
            </div>
        </div>
        </div>
    </nav>
    `,
    props: ['isLogin'],

    methods: {
        completedTask() {
            this.$emit('status', 'complete')
        },

        incompletedTask() {
            this.$emit('status', 'incomplete')
        },

        createTask() {
            this.$emit('input-task')
        },
        register() {
            this.$emit('register')
        }
    }
})

Vue.component('todo', {
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
        <a href="#" @click="$emit('edit')" class="card-footer-item">Edit</a>
        <a href="#" @click="$emit('delete')"class="card-footer-item">Delete</a>
        </footer>
    </div>
    `,
    props: ['todo'],



})

Vue.component('todo-list', {
    template: `
        <div>
            <todo v-if="!taskToUpdate" v-for="todo in todos" :todo="todo" @delete="deleteTask(todo)" @complete="completeTask(todo)" @edit="getTask(todo)"></todo>            
        </div>
    `,


    props: ['status', 'task'],

    data() {
        return {
            todos: [],
            taskToUpdate: null
        }
    },
    methods: {
        deleteTask(task) {
            axios.delete('http://localhost:3000/todo/delete', {
                    data: {
                        id: task._id
                    }
                })
                .then(response => this.todos = this.todos.filter(item => item.name !== task.name))
        },

        completeTask(task) {
            axios.patch(`http://localhost:3000/todo/complete/${task._id}`,{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(response => this.todos = response.data.tasks)
        },

        getTask(task) {
            // axios.get(`http://localhost:3000/todo/todos?_id=${task._id}`)
            // .then(response => this.taskToUpdate = response.data.todos)
            this.$emit('update', task)
        }
    },
    created() {
        axios.get('http://localhost:3000/todo/todos?complete=false',{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(response => this.todos = response.data.todos)
    },
    watch: {
        status(newValue) {
            // jika new Value == 'complete'
            // query ke database dapetin data semua todo yang complete
            // di assign ke dalam data todos
            if (newValue === 'complete') {
                axios.get('http://localhost:3000/todo/todos?complete=true',{
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .then(response => this.todos = response.data.todos)
            } else {
                axios.get('http://localhost:3000/todo/todos?complete=false',{
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .then(response => this.todos = response.data.todos)
            }
        },

        task() {
            axios.get('http://localhost:3000/todo/todos?complete=false',{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(response => this.todos = response.data.todos)
        }
    }

})

Vue.component('create-task', {
    template: `
        <div class="container button-container">
            <input class="input" type="text" placeholder="name of your task" v-model="taskName">
            <textarea class="textarea container" placeholder="task description" v-model="taskDescription"></textarea>
            <a class="button is-primary create" @click="addTask">add</a>
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
            axios.post(`http://localhost:3000/todo/create`, {
                    name: this.taskName,
                    description: this.taskDescription,
                }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.taskName = '',
                    this.taskDescription = ''
                    this.$emit('task-done')
                })
        }
    }
})

Vue.component('edit-task', {
    template: `
    <div>
        <input class="input" type="text" v-model="task.name ">
        <textarea class="textarea container" v-model="task.description"></textarea>
        <a class="button is-primary" @click="updateTask">edit</a>
    </div>
    `,

    props: ['task'],

    data() {
        return {

        }
    },

    methods: {
        updateTask() {
            console.log(this.task.name)
            axios.put(`http://localhost:3000/todo/update/${this.task._id}`, {
                    name: this.task.name,
                    description: this.task.description
                })
                .then((response) => {
                    this.$emit('done-update')
                })
        }
    }
})

Vue.component('register', {
    template: `
    <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign up</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
      <div class="field">
        <div class="control">
            <p class="errors" v-if=(userErrors.name)>{{userErrors.name}}</p>
            <input class="input is-primary" type="text" placeholder="name" v-model="user.name">
        </div>
      </div>
      <div class="field">
        <div class="control">
        <p class="errors" v-if=(userErrors.email)>{{userErrors.email}}</p>
            <input class="input is-primary" type="email" placeholder="email" v-model="user.email">
        </div>
      </div>
      <div class="field">
        <div class="control">
        <p class="errors" v-if=(userErrors.password)>{{userErrors.password}}</p>
            <input class="input is-primary" type="password" placeholder="password" v-model="user.password">
        </div>
      </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="newUser">Sign up</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
    `,
    props: ['register'],
    data() {
        return {
            user: {
                name : '',
                email: '',
                password: ''
            },
            userErrors: {
                email: "",
                name: "",
                password: ""
            }
        }
    },
    methods: {
        newUser() {
            axios.post(`http://localhost:3000/users/register`,{
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            })
            .then((response)=>{
                this.$emit('close')
                this.$emit('reg-success')
            })
            .catch((err)=>{
                console.log(err.response.data.message)
                if (err.response.data.message.email){
                    if (err.response.data.message.email.kind== "unique") {
                        this.userErrors.email = 'email is not available'
                    } 
                    if (err.response.data.message.email.kind== "user defined") {
                        this.userErrors.email = 'email address is not valid'
                    }
                    if (err.response.data.message.email.kind== "required") {
                        this.userErrors.email = 'email is required'
                    }
                } else if (!err.response.data.message.email) {
                    this.userErrors.email = ""
                }
                if (err.response.data.message.name) {
                    if (err.response.data.message.name.kind=="required") {
                        this.userErrors.name = 'name is required'
                    }
                } else {
                    this.userErrors.name = ''
                }
                if (err.response.data.message.password){
                    if (err.response.data.message.password.kind=="minlength"){
                        this.userErrors.password = 'password must be at least 6 characters'
                    } else if (err.response.data.message.password.kind=="required"){
                        this.userErrors.password = 'password is required'
                    }
                } else {
                    this.userErrors.password = ''
                }
            })
        }
    }
})

Vue.component('login', {
    template: `
    <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Log in</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
      <div class="field">
        <div class="control">
            <input class="input is-primary" type="email" placeholder="email" v-model="user.email">
        </div>
      </div>
      <div class="field">
        <div class="control">
            <input class="input is-primary" type="password" placeholder="password" v-model="user.password">
        </div>
      </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="userLogin">Log in</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
    `,
    props: ['register'],
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        userLogin() {
            axios.post(`http://localhost:3000/users/login`,{
                email: this.user.email,
                password: this.user.password
            })
            .then((response)=>{
                localStorage.setItem('token',response.data)
                this.$emit('close')
                this.$emit('log-in')
            })
            .catch((err)=>{
                console.log(err.response.data)
            })
        }
    }
})

new Vue({
    el: '#app',

    data: {
        status: '',
        task: false,
        updateTask: '',
        register: false,
        login: false,
        isLogin: false,
    },

    created() {
        let token = localStorage.getItem('token')
        if (token) {
            this.isLogin = true
        } else {
            this.isLogin = false
        } 
    },

    methods: {
        changeStatus(status) {
            this.status = status
            this.task = false
        },

        newTask() {
            this.task = true
        },
        removeTask() {
            this.task = false
        },
        update(task) {
            this.updateTask = task
        },
        done() {
            this.updateTask = ""
        },
        registerForm() {
            this.register = true
        },
        close() {
            this.register = false
            this.login = false
        },
        regSuccess() {
            this.login = true
        },
        logout() {
            this.isLogin = false
            localStorage.removeItem('token')
            this.id = ''
        },
        userLogin() {
            this.isLogin = true
        } 
    }
})