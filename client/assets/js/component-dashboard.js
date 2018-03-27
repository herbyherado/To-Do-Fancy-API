var heading = Vue.component('heading',{
    template:`
    <div class="top-header">
        <div class="animated slideInLeft">
            <a id="home" href="#" >you-do .</a>
        </div>
        <div class="animated slideInLeft">
        </div>
        <div class="login animated slideInDown">
            <dash-heading></dash-heading>
        </div>
    </div>
    `
  })

  var dashHeading = Vue.component('dash-heading', {
    template:`
      <a id="sign-in" onclick="logout()" style="cursor:pointer">log out</a>
    `
  })

  var listFooter = Vue.component('list-footer', {
    template: `
        <div class="footer">
          <div class="length">
            <h3>You have {{total}} items left</h3>
          </div>
          <div class="filters">
            <a></a>
            <a></a>
            <a></a>
          </div>
          <div class="clear-all" @click="removeAll()">
            <button class="buttons">Clear All</button>
          </div>
        </div>
    `,
    props:['total', 'remove-all']
  })

  var todos = Vue.component('todos', {
      template:`
        <div class="todo-list" >
          <transition-group name="list" enter-active-class="animated slideInUp" leave-active-class="animated slideOutLeft">
            <div class="items" v-for="(item, i) in todolist" :key="i">
              <div class="checklist" @click="cross(item._id)" style="cursor:pointer">
                <a v-if="!item.status">&#9744;</a>
                <a v-else>&#9745;</a>
              </div>
              <div class="text" v-if="item.status">
                <strike><h3>{{item.text}}</h3></strike>
              </div>
              <div class="text" v-else>
                <h3>{{item.text}}</h3>
              </div>
              <div class="destroy" @click="remove(item._id)" style="cursor:pointer">
                <a>&times;</a>
              </div>
            </div>
          </transition-group>
        </div>
      `,
      props:['todolist', 'remove', 'cross']
  })

  var forms = Vue.component('forms', {
    template:`
    <div class="todo-input">
      <div class="todo-title animated zoomIn">
        <h1>you do</h1>
      </div>
      <form v-on:submit.prevent="addTodo">
        <div class="add-todo">
          <input type="text" 
          class="form-control animated-search" 
          placeholder="What needs to be done?" 
          v-model="newTodo" 
          @change="formInput" 
          v-validate="'min:4'" 
          name="input item"> 
          <transition name="alert-in">
            <p class="alert" v-if="errors.has('input item')">{{ errors.first('input item') }}</p>
          </transition>
        </div>
      </form>
    </div>
    `,
    props: ['addTodo'],
    methods: {
      formInput: function(){
        console.log(this.newTodo)
        this.$emit('test', this.newTodo)
        this.newTodo=''
      }
    },
    data: function() {
      return {
        newTodo: ''
      }
    }
  })