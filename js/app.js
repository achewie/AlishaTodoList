function TodoCtrl($scope) 
{
    $scope.todos = [];
    $scope.completedTasks = [];
    $scope.markAll = false;

// LocalStorage Stuff -----------------------------------------------------

    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!== null) ? JSON.parse($scope.saved) : [{text:'Clean your room', done:false}];
    localStorage.setItem('todos', JSON.stringify($scope.todos));

    $scope.savedCompleted = localStorage.getItem('completedTasks');
    $scope.completedTasks = (localStorage.getItem('completedTasks')!== null) ? JSON.parse($scope.savedCompleted) : [{text:'homework', done:true}]
    localStorage.setItem('completedTasks', JSON.stringify($scope.completedTasks));

// ------------------------------------------------------------------------
    
    $scope.addTodo = function() 
    {
        if(event.keyCode == 13 && $scope.todoText)
        {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
            localStorage.setItem("todos", JSON.stringify($scope.todos));
        }
    };

    $scope.isTodo = function()
    {
        return $scope.todos.length > 0;  
    }

    $scope.markComplete = function(index, todo)
    {
        /* You add the todo to the completedTasks array */
        $scope.completedTasks.push(
        {
            text:todo.text,
            done:todo.done
        });

        localStorage.setItem("completedTasks", JSON.stringify($scope.completedTasks));
    
    /* Then, you delete the same todo from the todos array */
        $scope.todos.splice(index, 1);

        localStorage.setItem("todos", JSON.stringify($scope.todos));
        $scope.todo =null;
    }

    $scope.markIncomplete = function(index)
    {
        $scope.todo.push($scope.todos[index].text);

        $scope.todo = null;
    }

    $scope.editTodo = function(index, todoText)
    {
        $scope.todos[index].text = todoText;
        console.log('-- in editTodo');
        localStorage.setItem("todos", JSON.stringify($scope.todos));
    }

    $scope.editOnEnter = function($index, todo)
    {
        if(event.keyCode == 13 && todo.text){

        }
    };
    
    $scope.remaining = function() 
    {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
        });
        return count;
    };

  $scope.hasDone = function() {
      return ($scope.completedTasks.length > 0);
  }    
    
  $scope.itemText = function() {
      return ($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";     
  };
      
  $scope.toggleMarkAll = function() {
      angular.forEach($scope.todos, function(todo) {
        todo.done =$scope.markAll;
      });
  };
  
    $scope.clearCompletedTasks = function() 
    {
        // Set the completedTasks array to an empty array
        $scope.completedTasks = [];
        localStorage.setItem("completedTasks", JSON.stringify($scope.completedTasks));
    };
}


