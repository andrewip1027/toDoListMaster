var tasker = {
    construct: function() {
        this.selectElements();
        this.bindEvents();
    },

  selectElements:function(){
    this.errorMessage = document.getElementById('error');
    this.taskInput = document.getElementById('input-task');
    this.addButton = document.getElementById('add-task-btn');
    this.taskList = document.getElementById('tasks');
    this.taskListChildren = document.getElementById('tasks');
  },

    buildTask: function() {
  //a) taskListItem (Master of all var)  b)taskCheckBox
  //c) taskValue  d)taskButton e)taskTrash
      var taskListItem = document.createElement('li') //we made taskListItem variable
      this.taskList.appendChild(taskListItem);
//b) Checkbox    always create element first
      var taskCheckBox = document.createElement('input');
      taskCheckBox.setAttribute("type", "checkBox");
      taskListItem.appendChild(taskCheckBox);
//c) Taskvalue
      var taskValue = document.createTextNode(this.taskInput.value);
      taskListItem.appendChild(taskValue);
// d) button
      var taskButton = document.createElement('button');
      taskListItem.appendChild(taskButton);
//e) taskTrash      ONLY a icon
      var taskTrash = document.createElement('i');
      taskTrash.setAttribute("class", "fa fa-fw fa-trash");
      taskButton.appendChild(taskTrash);
      taskButton.onclick = this.deleteButton.bind(this, taskListItem);

      var categoryTaskList = document.createElement('ul');
      taskListItem.appendChild(categoryTaskList);

      const data = {
        title: this.taskInput.value
      };
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `${window.location.href}addTask`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));

      // TODO: add a whatever button to the task list item
    },

    // return true if there is an error with taskInput
    checkError: function() {
      return this.taskInput.value === "";
    },

    error: function() {
      // Task: make error message appear when the user hasn't typed anything
      // inside placeholder

      // TODO: Check whether the user has typed anything
      // TODO: make error message appear
      if(this.checkError()){
        this.errorMessage.style.display = "initial";
      } else {
      this.errorMessage.style.display = "none";
      }

    },

    addTask: function(){
      // Task: don't call this.buildTask() when there is an error

      // TODO: check if there is no error
      if(!this.checkError()){
          // TODO: call this.buildTask()
          this.buildTask();
      }
       this.error();
       this.clearInput();
    },


      clearInput: function(){
        document.getElementById('input-task').value = "";
      },

    onKeyPress: function(e) {
      e = e || window.event;
      // use e.keyCode
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13) {  //13 in js is Enter, so that task is added when we press enter
        //https://www.w3schools.com/jsref/event_key_keycode.asp
        //https://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
        this.addTask();
      }
    },

    //
    bindEvents:function(){
      this.addButton.onclick = this.addTask.bind(this); 
      document.onkeypress = this.onKeyPress.bind(this);//made another onKeypres function so that bindEventsFunction can detect on key press 
    },

    deleteButton:function(taskListItem){
      this.taskList.removeChild(taskListItem);
    },
}