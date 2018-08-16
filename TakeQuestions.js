var QuestionsSet = 
[   {
    QuestionHeader:"C# Multiple Choice Questions"
    }
];
var QuestionNo =1; 
var GetQuestion = function()
{
    QuestionsSet[QuestionNo]={};
    //console.log(QuestionNo);
    QuestionsSet[QuestionNo].Topic=document.getElementById("QTopic").value;
    QuestionsSet[QuestionNo].Difficulty=document.querySelector('input[name="QDifficultyLevel"]:checked').value;
    QuestionsSet[QuestionNo].Question=document.getElementById("QText").value;
    QuestionsSet[QuestionNo].AnswerType=document.querySelector('input[name="AnswerType"]:checked').value;
    QuestionsSet[QuestionNo].NumOption=document.getElementById("NumOption").value;
    QuestionsSet[QuestionNo].NumCorrect=document.getElementById("NumCorrect").value;
    QuestionsSet[QuestionNo].Options={};
    for(let i=0;i<=QuestionsSet[QuestionNo].NumOption;i++)
    {
        QuestionsSet[QuestionNo].Options[i]=document.getElementById("OptionText"+[i]).value;
    }

    if(QuestionsSet[QuestionNo].AnswerType=="MCA")
    {
        QuestionsSet[QuestionNo].CorrectOpt=[];
        $.each($("input[name*=AnswerInput]:checked"), function(){
            QuestionsSet[QuestionNo].CorrectOpt.push($(this).val())
        });
     }
     else
     {
        QuestionsSet[QuestionNo].CorrectOpt=document.querySelector('input[name*=AnswerInput]:checked').value;
     }
    
    
    console.log(QuestionsSet);
    $("#QText").val('');
    $("#NumOption").val('');
    $("#NumCorrect").val('1');
    for(let i=0;i<=4;i++)
    {
        document.getElementById("OptionText"+[i]).value="";
    }
    if(QuestionsSet[QuestionNo].AnswerType=="MCQ")
    document.querySelector('input[name=AnswerInput]:checked').checked=false;
   else
   {
        $.each($("input[name*=CheckRight]:checked"), function(){
            $(this).prop('checked',false);
        });
   }
   QuestionNo++;
    console.log(QuestionNo)

   

    // var myJsonString = JSON.stringify(QuestionsSet);
    //     var blob = new Blob([myJsonString], {
    //         type: "application/json;charset=charset=utf-8"
    //     });
    //     saveAs(blob, "Question.txt");
  
}

$('#QForm').submit(function (e) { 
    e.preventDefault();
    
});

var QuestionSubmit= function()
{
    GetQuestion();
    

    var myJsonString = JSON.stringify(QuestionsSet);
        var blob = new Blob([myJsonString], {
            type: "application/json;charset=charset=utf-8"
        });
        saveAs(blob, "Question.json");

        document.getElementById("QuestionForm").innerHTML="";
}

var Allow=false;

function OptionDisplay()
{   
    let q=$("#NumOption").val();
    let temp = document.querySelector('input[name="AnswerType"]:checked').value;

    if(temp=="MCQ")
    {
        $("input[name*=AnswerInput]").attr("type","radio");
    }
    else
    {
        $("input[name*=AnswerInput]").attr("type","checkbox");
    }

    $("#OptionTable").addClass("collapse show");

    for(let i=1;i<=5;i++) //To hide
    {
        $("#OptionRow"+[i]).css("visibility", "hidden");
    }

    for(let i=1;i<=q;i++) //To Show
        {
        $("#OptionRow"+[i]).css("visibility", "visible");
        }

}











$(document).ready(function(){
$("#NumOption").blur(function() { 

    let q=$(this).val();
    if(q>1 && q<6)
    {
        OptionDisplay();
        Allow=true;
    }
    else
    {
        alert("Enter Val btwn 2-5");
        $(this).val("");
    }


});
});

$(document).ready(function(){
$("#NumCorrect").focusout(function(){
    let q=$(this).val();
    let q2=$("#NumOption").val();
    if(document.querySelector('input[name="AnswerType"]:checked').value=="MCQ")
    {
        if(q>1)
        {
            alert("For MCQ Num of correct options is 1");
            $(this).val(1);
        }
    }
    else if(q>=q2)
    {
        alert("No. of Correct Options can't be greater or equal to No. of Options")
        $(this).val("");

    }
    else
    {
        OptionDisplay();
    }
    
    
});
});

$(document).ready(function(){
    $('input[name*=AnswerType]').change(function(){
        
        if (Allow==true)
        {
            
            OptionDisplay();
        }

});
});


// Form Validation

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
  $( "#QForm" ).validate({
    rules: {
        QTopic: {
        required: true
      }
    }
  });