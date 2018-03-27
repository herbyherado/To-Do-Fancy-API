Vue.use(VeeValidate);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

new Vue({
    el: '#app',
    data : {
     message: 'hello world',
     show: false,
     todolist : [],
     showlist: [],
     newTodo : '',
     totalItem: 0
    },
    methods: {
      mouseOver (){
        return this.show = true
      },
      mouseLeave (){
        return this.show = false
      },
      addTodo(){
       let newItem = this.newTodo.trim()
       this.$validator.validateAll().then((result) => {
         if(result){
           axiosInstance.post( '/todo', {text: newItem}, {
             headers: {token: localStorage.getItem('token')}
            })
            .then(response => {
              console.log(response)
              this.newTodo = ''
             //  window.location.reload()
            })
            .catch(error => {
              console.log(error)
            })
         } else {
           console.log('not valid')
         }
       })
      },
      setTodo(string){
        this.newTodo = string
      },
      cross(id){
        console.log(id)
        axiosInstance.put(`/todo/status/${id}`)
         .then(response => {
           console.log(response)
          //  window.location.reload()
         })
         .catch(error => {
           console.log(error)
         })
      },
      remove(id){
        console.log(id)
        axiosInstance.delete(`/todo/${id}`)
         .then(response => {
           console.log(response)
          //  window.location.reload()
         })
         .catch(error => {
           console.log(error)
         })
      },
      removeAll(){
        axiosInstance.post(`/todo/all`, {},{
          headers: {token: localStorage.getItem('token')}
        })
         .then(response => {
           console.log(response)
          //  window.location.reload()
         })
         .catch(error => {
           console.log(error)
         })
      }
    },
    computed: {
      total: function (){
        let count = 0;
        for (let i = 0; i < this.todolist.length; i++){
          if(this.todolist[i].status == false){
            count++
          }
        }
        return count
      },
    },
    components: {
      heading: heading,
      dashHeading: dashHeading,
      listFooter: listFooter,
      todos:todos,
      forms:forms
     },
     created: function () {
       axiosInstance.post('/todo/getAll', {}, {
          headers: {token: localStorage.getItem('token')}
        })
         .then(response => {
           this.todolist = response.data.todos
           console.log('ini', this.todolist)
           // this.todolist.map(todo => )
         })
         .catch(error => {
           console.log(error)
         })
     },
     updated: function (){
       axiosInstance.post('/todo/getAll', {}, {
          headers: {token: localStorage.getItem('token')}
        })
         .then(response => {
           console.log(response.data.todos)
           this.todolist = response.data.todos
         })
         .catch(error => {
           console.log(error)
         })
     }
  })
 