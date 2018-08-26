var QuestionsSet = 
[   {
        
    }
];
var NumToOpt = function(Opt) // to use convert Alpha options to numeric options 
{
    if(Opt==1) return "A";
    else if (Opt==2) return "B";
    else if(Opt==3) return "C";
    else if(Opt==4) return "D";
    else if(Opt==5) return "E";
}
var QuestionNo =1; 

function ValdtAnsType ()
{
    let ULength = $('#NumCorrect').val();
   let Length= $('input[name=AnswerInput]:checked').length;
   console.log("Length of check box"+Length)
   if(Length==0)
   {
        $('#basicExampleModal').modal('toggle');
        $('#ModalLabel').html('Data Error');
        $('#ModalMessage').html("Select any correct option in the Options Tab");
        return false
   }
   else if(Length<ULength || Length>ULength)
   {
        $('#basicExampleModal').modal('toggle');
        $('#ModalLabel').html('Data Error');
        $('#ModalMessage').html("Tick options should be equal to Num of correct options as you mentioned");
        return false
   } 
   else
   return true
}

var GetQuestion = function() //Called By Next Question Button And Submit Function
{
    if(ValdtAnsType())
    {
        QuestionsSet[QuestionNo]={};
        QuestionsSet[QuestionNo].Topic=document.getElementById("QTopic").value;
        QuestionsSet[QuestionNo].Difficulty=document.querySelector('input[name="QDifficultyLevel"]:checked').value;
        QuestionsSet[QuestionNo].Question=document.getElementById("QText").value;
        QuestionsSet[QuestionNo].AnswerType=document.querySelector('input[name="AnswerType"]:checked').value;
        QuestionsSet[QuestionNo].NumOption=document.getElementById("NumOption").value;
        QuestionsSet[QuestionNo].NumCorrect=document.getElementById("NumCorrect").value;
        QuestionsSet[QuestionNo].Options={};
        for(let i=1;i<=QuestionsSet[QuestionNo].NumOption;i++)
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
        RemoveData() ;
        QuestionNo++;
    }
    return false; // return false to avoid form submission and refresh
}

function RemoveData()
{
    $("#QText").val('');
    $("#NumOption").val('');
    $("#NumCorrect").val('1');
    if(QuestionsSet[QuestionNo].AnswerType=="MCQ")
    document.querySelector('input[name=AnswerInput]:checked').checked=false;
   else
   {
        $.each($("input[name*=CheckRight]:checked"), function(){
            $(this).prop('checked',false);
        });
   }
   for(let i=1;i<=5;i++) //To hide
    {
        $("#OptionText"+[i]).val('');
    }
   $("#OptionTable").addClass("collapse");
}

$('#QForm').submit(function (e) {  // To disable form submit to avoid page reload
    e.preventDefault();
    
});

var QuestionSubmit= function()
{
    if(ValdtAnsType())
    {
    GetQuestion();

        

    var myJsonString = JSON.stringify(QuestionsSet);
        var blob = new Blob([myJsonString], {
            type: "application/json;charset=charset=utf-8"
        });
        saveAs(blob, "questions.json");

        document.getElementById("QuestionForm").innerHTML="";
    }
}

var Allow=false;

function OptionDisplay()
{   
    let q=$("#NumOption").val();
    
    for(let i=1;i<=5;i++) //To hide
    {
        $("#OptionRow"+[i]).remove();
    }

    for(let i=1;i<=q;i++) //To Show
    {
        let Row = $('<tr id="OptionRow'+i+'"></tr>');
        let col1 =$('<td>'+i+'</td>');
        let col2 =$('<td><textarea rows="1" class="form-control" id="OptionText'+i+'" required></textarea></td>')
        let OptNUm = NumToOpt(i);
        let col3 =$('<td><input type="radio" name="AnswerInput" value="'+OptNUm+'"></td>');
        let col4 =$('<td><label id="Mark'+q+'></td>')
        $(Row).append(col1);
        $(Row).append(col2);
        $(Row).append(col3);
        $(Row).append(col4);
        $("tbody").append(Row);
    }

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
            $('#basicExampleModal').modal('toggle');
            $('#ModalLabel').html('Data Error');
            $('#ModalMessage').html("For MCQ Num of correct options is 1");
            $(this).val(1);
        }
    }
    else if(q>=q2)
    {
        $('#basicExampleModal').modal('toggle');
        $('#ModalLabel').html('Data Error');
        $('#ModalMessage').html("No. of Correct Options can't be greater or equal to No. of Options");
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
        
        
        {
            let temp = document.querySelector('input[name="AnswerType"]:checked').value;
            if(temp=="MCQ")
            {
                $("input[name*=AnswerInput]").attr("type","radio");
            }
            else
            {
                $("input[name*=AnswerInput]").attr("type","checkbox");
            }
        }

});
});


// Form Validation

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
  $( "#QForm" ).validate({
    rules:{
        NumOption:{
            required:true
            },
        NumCorrect:{
            required:true
        },
        AnswerInput:{
            required:true
        }

    },
    messages:{
        NumOption:{
            required: "Number options is Required"
        },
        NumCorrect:{
            required: "Number Correct options is Required"
        }
    },
   
  });

  OptionDisplay(); // calls it to create a default option display 