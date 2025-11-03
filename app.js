var app = angular.module("studentApp", []);

// Directive for highlighting top performer
app.directive("highlightTopper", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      scope.$watch(attrs.highlightTopper, function(isTop) {
        if (isTop === true) {
          element.addClass("highlight");
        } else {
          element.removeClass("highlight");
        }
      });
    }
  };
});

app.controller("StudentController", function($scope) {
  $scope.students = [];
  $scope.newStudent = {};
  $scope.searchText = "";
  $scope.topMarks = null;

  // Add student
  $scope.addStudent = function() {
    if (
      !$scope.newStudent.name ||
      !$scope.newStudent.marks ||
      !$scope.newStudent.grade
    ) {
      alert("Please fill all fields!");
      return;
    }

    $scope.students.push({
      name: $scope.newStudent.name.trim(),
      marks: parseInt($scope.newStudent.marks, 10),
      grade: $scope.newStudent.grade.trim()
    });

    $scope.newStudent = {};
    $scope.updateTopMarks();
  };

  // Update top marks for highlighting
  $scope.updateTopMarks = function() {
    if ($scope.students.length === 0) {
      $scope.topMarks = null;
      return;
    }
    var marks = $scope.students.map(s => s.marks || 0);
    $scope.topMarks = Math.max.apply(null, marks);
  };

  // students list for changes
  $scope.$watchCollection("students", function() {
    $scope.updateTopMarks();
  });
});
