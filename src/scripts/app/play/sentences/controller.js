'use strict';
module.exports =

/*@ngInject*/
function SentencePlayCtrl(
  $scope, $state, SentenceWritingService, RuleService, _
) {

  $scope.$watch('currentRuleQuestion', function(crq) {
    if (_.isObject(crq)) {
      $scope.currentRule = $scope.swSet[crq.ruleIndex];
    }
  });


  $scope.$on('correctRuleQuestion', function() {
    $scope.showNextQuestion = true;
  });

  $scope.nextQuestion = function() {
    $scope.showNextQuestion = false;
    var crq = $scope.currentRuleQuestion;
    var ncrq = $scope.questions[_.indexOf($scope.questions, crq) + 1];
    $scope.currentRuleQuestion = ncrq;
  };

  if ($state.params.id) {
    SentenceWritingService.getSentenceWriting($state.params.id).then(function(sw) {
      $scope.sentenceWriting = sw;
      var ruleIds = _.pluck(sw.rules, 'ruleId');
      var quantities = _.pluck(sw.rules, 'quantity');
      return retrieveNecessaryRules(ruleIds, quantities);
    }, errorStateChange);
  } else if ($state.params.ids) {
    var ids = $state.params.ids.split(',');
    var quantities = _.chain(ids)
      .map(function() { return 3; })
      .value();
    retrieveNecessaryRules(ids, quantities);
  }

  function retrieveNecessaryRules(ruleIds, quantities) {
    RuleService.getRules(ruleIds).then(function(resolvedRules) {
      $scope.swSet = _.chain(resolvedRules)
        .map(function(rr, i) {
          rr.selectedRuleQuestions = _.chain(rr.resolvedRuleQuestions)
            .sample(quantities[i])
            .map(function(rrq) {
              rrq.ruleIndex = i;
              return rrq;
            })
            .value();
          return rr;
        })
        .value();

      $scope.questions = _.chain($scope.swSet)
        .pluck('selectedRuleQuestions')
        .flatten()
        .value();

      $scope.currentRuleQuestion = $scope.questions[0];
      $scope.showNextQuestion = false;
      $scope.showPreviousQuestion = false;
    }, function() {
      //errorStateChange();
    });
  }

  function errorStateChange() {
    $state.go('index');
  }
};