

var Instruction=[];
$.getJSON("Instructions.json",function(data){ Instruction=data }); //parsing Json file to Instruction object


$(document).ready(function(){

    $("#TakeTest").$

    $('#TakeTest').click(function (e) { 
        e.preventDefault();
    $(this).remove();
    $('#McqHeader').show();
    $('#McqContent').show();
    $('#StartTest').show();
    $("#McqHeader").html(Instruction[0].InstructionHeader);
    let length=Instruction[1].InstructionSet.length
    alert(length)
    for(let q=0;q<=length;q++)
    {
    $("#McqContent").append(Instruction[1].InstructionSet[q]);
    }
    });

    $("#StartTest").click(function (e) { 
        e.preventDefault();
        
    });



});
