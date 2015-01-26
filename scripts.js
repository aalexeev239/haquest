var haQuest = (function() {
  var me = {};
  var $fields = $('.quest__challenge');
  var fieldsCount = $fields.length;
  var result = {};
  var $prevBtn = $('#prevBtn');
  var $nextBtn = $('#nextBtn');
  var $resetBtn = $('#resetBtn');
  var $panel = $('#panel');



  me.init = function () {
    if (fieldsCount) {
      // console.log($fields.find('select'));
      resetForm();

      $fields.find('select').on('change', onSelectChanged);

      $prevBtn.on('click', -1, onNavBtnClicked);
      $nextBtn.on('click', 1, onNavBtnClicked);
      $resetBtn.on('click', resetForm);
    }
  };



  function resetForm() {
    $prevBtn.removeClass('hidden');
    $nextBtn.removeClass('hidden');
    $resetBtn.addClass('hidden');
    $panel.find('.results').remove();

    // $fields.addClass('hidden').eq(0).removeClass('hidden');
    // $prevBtn.addClass('disabled');

    $fields.find('select').each(function(){
      var name = this.name;
      var value = this.value || 0;
      result[name] = value;
    });
  }



  function onSelectChanged(e) {
    var name = this.name;
    var value = this.value;
    var $self = $(this);
    var field = $(this).closest('.quest__challenge')[0];
    var index = $fields.indexOf(field);

    if (field && index >=0 && name in result) {

      result[name] = value;

      goToSelect(field, index+1);
    }
  }



  function goToSelect(curentField, index) {
    var newField = $fields.get(index);

    index === 0 && $prevBtn.addClass('disabled');
    $prevBtn.hasClass('disabled') && index > 0 && $prevBtn.removeClass('disabled');

    // index === (fieldsCount - 1) && $nextBtn.addClass('disabled');
    // $nextBtn.hasClass('disabled') && (index < (fieldsCount - 1)) && $nextBtn.removeClass('disabled');

    if (index < fieldsCount) {
      curentField.classList.add('hidden');
      newField.classList.remove('hidden');
      return newField;
    }

    publishResult(result);
  }



  function onNavBtnClicked(e) {
    e.preventDefault();
    var currentField = $fields.not('.hidden')[0];
    var index = $fields.indexOf(currentField);
    if(! isNaN(e.data)) {
      goToSelect(currentField, index + e.data);
    }

  }



  function publishResult(result) {
    $fields.addClass('hidden');
    $prevBtn.addClass('hidden');
    $nextBtn.addClass('hidden');
    $resetBtn.removeClass('hidden');
    var resultString = '<table class="results">';

    for (var property in result) {
      if (result.hasOwnProperty(property)) {
        var propertyName = '№ '+(''+property).substring(2);
        // var value = encodeURI(result[property]);
        var value = result[property].replace(/</g, "&lt;").replace(/>/g, "&gt;");;
        if (+value === 0) {
          value = "нет ответа";
        }
        console.log(value);
        // console.log(value, typeof value);
        resultString = resultString + '<tr><td>'+propertyName+'</td><td>'+ value +'</td></tr>';
      }
    }

    console.log(resultString);
    resultString += '</table>';
    // console.log(resultString);
    $panel.append(resultString);
  }

  return me;
}());

Zepto(function($){
  haQuest.init()
})