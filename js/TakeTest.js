

var Instruction=[];
$.getJSON("Instructions.json",function(data){ Instruction=data }); //parsing Json file to Instruction object


$(document).ready(function(){

    $("#TakeTest").$

    $('#TakeTest').click(function (e) { 
        e.preventDefault();
    $(this).remove();
    $('McqHeader').show('qqq');
    $('McqContent').show();
    $('StartTest').show();
    $("McqHeader").html(Instruction[0].InstructionHeader);
    $("McqContent").html(Instruction[1].InstructionSet[1]);
    });

});
