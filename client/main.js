Vue.component('navbar',{
    template: `
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
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
            <a class="navbar-item">
            Home
            </a>
    
            <a class="navbar-item">
            Documentation
            </a>
    
            <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                More
            </a>
    
            <div class="navbar-dropdown">
                <a class="navbar-item">
                About
                </a>
                <a class="navbar-item">
                Jobs
                </a>
                <a class="navbar-item">
                Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                Report an issue
                </a>
            </div>
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
    `
})

Vue.component('todo',{
    template: `
    <div class="card container">
        <header class="card-header">
        <p class="card-header-title">
            Component
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </a>
        </header>
        <div class="card-content">
        <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        </div>
        <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
        </footer>
    </div>
    `
})

Vue.component('todo-list',{
    template: `
        <todo></todo>
    `,

    data() {
        return {
            todo: []
        }
    },

    mounted() {
        axios.get('/todo').then(response => console.log(response))
    }
})

new Vue({
    el: '#app'
})