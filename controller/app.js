var app = angular.module('taskApp', []);

app.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
    $scope.tasks = [];
    $scope.newTask = '';
    $scope.nodeJSServer = 'http://localhost:3100';

    // Function to load all tasks
    $scope.loadTasks = function () {
        $http.get($scope.nodeJSServer + '/tasks/').then(function (response) {
            $scope.tasks = response.data;
        });
    };

    // Function to add a task
    $scope.addTask = function () {
        $http.post($scope.nodeJSServer + '/tasks/', { task: $scope.newTask }).then(function (response) {
            $scope.tasks.push(response.data); // Add the new task to the list
            $scope.newTask = ''; // Reset the input field
        });
    };

    // Function to delete a task
    $scope.deleteTask = function (id) {
        $http.delete($scope.nodeJSServer + '/tasks/' + id).then(function (response) {
            $scope.loadTasks(); // Reload the list
        });
    };

    // Function to update a task
    // $scope.updateTask = function (id, updatedTask) {
    // };

    // Function to toggle the status of a task
    $scope.toggleStatus = function (id, status) {
        var newStatus = status === 'completed' ? 'not_completed' : 'completed';
        $http.put($scope.nodeJSServer + '/tasks/' + id + '/status', { status: newStatus }).then(function (response) {
            $scope.loadTasks(); // Reload the list to reflect the changes
        });
    };

    // Function to update a task's status
    $scope.updateStatus = function (id, newStatus) {
        $http.put($scope.nodeJSServer + '/tasks/' + id + '/status', { status: newStatus }).then(function (response) {
            $scope.loadTasks(); // Reload the list
        });
    };

    // Initial load of tasks
    $scope.loadTasks();
}]);


