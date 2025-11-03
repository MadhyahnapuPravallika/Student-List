var app = angular.module("studentApp", []);

// Directive to highlight the top performer
app.directive("highlightTopper", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      scope.$watch(attrs.highlightTopper, function(isTop) {
        if (isTop) element.addClass("highlight");
        else element.removeClass("highlight");
      });
    }
  };
});

app.controller("StudentController", function($scope) {
  $scope.students = [];
  $scope.newStudent = {};
  $scope.sortColumn = "rollNo";
  $scope.reverseSort = false;
  $scope.topMarks = null;

  // Add Student
  $scope.addStudent = function() {
    if (!$scope.newStudent.rollNo || !$scope.newStudent.name || !$scope.newStudent.marks) {
      alert("Please fill Roll No, Name, and Marks!");
      return;
    }

    let marks = parseInt($scope.newStudent.marks, 10);
    let grade = "";

    if (marks >= 90) grade = "A";
    else if (marks >= 75) grade = "B";
    else if (marks >= 60) grade = "C";
    else if (marks >= 45) grade = "D";
    else grade = "F";

    $scope.students.push({
      rollNo: $scope.newStudent.rollNo.trim(),
      name: $scope.newStudent.name.trim(),
      marks: marks,
      grade: grade
    });

    $scope.newStudent = {};
    $scope.updateTopMarks();
  };

  // Sorting logic
  $scope.sortBy = function(column) {
    if ($scope.sortColumn === column) {
      $scope.reverseSort = !$scope.reverseSort;
    } else {
      $scope.sortColumn = column;
      $scope.reverseSort = false;
    }
  };

  // Find top performer
  $scope.updateTopMarks = function() {
    if ($scope.students.length === 0) {
      $scope.topMarks = null;
      return;
    }
    $scope.topMarks = Math.max.apply(null, $scope.students.map(s => s.marks));
  };

  $scope.$watchCollection("students", function() {
    $scope.updateTopMarks();
  });

  // Multi-field filter (shows results if any field matches)
  $scope.multiSearchFilter = function(student) {
    var nameMatch = $scope.searchName && student.name.toLowerCase().includes($scope.searchName.toLowerCase());
    var rollMatch = $scope.searchRoll && student.rollNo.toString().includes($scope.searchRoll);
    var gradeMatch = $scope.searchGrade && student.grade.toLowerCase().includes($scope.searchGrade.toLowerCase());

    // Return true if any field matches (OR condition)
    return (
      !$scope.searchName && !$scope.searchRoll && !$scope.searchGrade ||
      nameMatch || rollMatch || gradeMatch
    );
  };
});
