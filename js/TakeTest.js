
var User = {

    Name:"",DoB:{},Score:[Total=0]
}

$.getJSON("questions.json",function(data){ Questions=data });  //parsing Json file to questions object

$.getJSON("Instructions.json",function(data){ Instruction=data }); //parsing Json file to Instruction object


$(document).ready(function()
{

    $('#TakeTest').click(function (e) // take Test on click Event
    { 
        e.preventDefault();
        $(this).remove();
        $('#McqHeader').show();
        $('#McqContent').show();
        $('#StartTest').show();
        $("#McqHeader").html(Instruction[0].InstructionHeader);
        let length=Instruction[1].InstructionSet.length
        
        for(let q=0;q<=length;q++)
        {
            $("#McqContent").append(Instruction[1].InstructionSet[q]);
        }
    });
});

function StartTest() //Start button on click event
{
    $('#StartTest').remove();
   
    $('#AnswerTag').show();
    
    $('#QuestionButton').show();
    $('#QuestionButton').css({'display': 'flex',
        'justify-content': 'center'});
    $('#TimerDiv').show();
    $('#NotAnswerMark').show();
    $('#timer').html(10 + ":" + 00);

    for (let q = 1 ;q<Questions.length;q++)
    User.Score[q]='NotAnswer';

    NextQuestion();
    
    StartTimer();
    CreateAnswerBox();
    
}


var QNo=1; // itretion for Question number
var Allow=false
var NextQuestion = function(who) // Next, Back button onclick event
{
       
        if(Allow) // Allows To GetAnswer() if True And Vice Versa
        {
            GetAnswer(who);
        }

        if(QNo==1)
        {
            
            document.getElementById("BackQuestion").disabled=true;
        }
        else
        {
            document.getElementById("BackQuestion").disabled=false;
        }

        if(QNo==(Questions.length-1))
        {
            
            document.getElementById("NextQuestion").style.display="none";
        }
        else
        {
            document.getElementById("NextQuestion").style.display="block";
        }

        
        
        if (QNo<(Questions.length))
        {
            $('#McqHeader').html(Questions[QNo].Topic);
            $('#McqContent').html(Questions[QNo].Question);
            
            for (let q=0;q<5;q++) // to hide all the Rows 
            {   
                $('#Row'+q).hide();
            }
            let length = Questions[QNo].NumOption
            
            for ( let q=0;q<length;q++) // To the Required Rows
            {   
                
                $("#Row"+q).show();
                $("#Opt"+q).html(Questions[QNo].Options[q]);
                
            }
            // To Change Based on the CHOICE
            if(Questions[QNo].AnswerType=="MCQ")
            {
                $("input[name*=choice]").attr("type","radio");
            }
            else
            {
                $("input[name*=choice]").attr("type","checkbox");
            }
            // To Sow the already answered Questions Tick Mark
            if(User.Score[QNo]!=undefined && User.Score[QNo]!="NotAnswer")
            {
                if(Questions[QNo].AnswerType=="MCQ")   //for Mcq
                $('#'+User.Score[QNo]).prop('checked',true);
                else
                {
                    for(let i=0;i<User.Score[QNo].length;i++)     // for MCA
                    {
                        console.log(User.Score[QNo].length)
                        $('#'+User.Score[QNo][i]).prop('checked',true);
                        console.log(User.Score[QNo][i]);
                    }
                }
            }
            Allow=true;     
        }
        

}


var GetAnswer= function(who)
{
    

    if(document.querySelector('input[name="choice"]:checked'))
    {
       
        if (Questions[QNo].AnswerType=="MCQ")
        {
            User.Score[QNo]= document.querySelector('input[name="choice"]:checked').value;
        document.querySelector('input[name="choice"]:checked').checked=false;
        }
        else
        {   
            User.Score[QNo]=[];

           
            $.each($("input[name*=choice]:checked"), function(){
                User.Score[QNo].push($(this).val())
                $(this).prop('checked',false)
            });
        }
        
       
        document.getElementById("AnswerBox"+[QNo]).style.background="green";
        console.log(User);
    }
    else
    {
        if(User.Score[QNo]=="NotAnswer")
        {
        document.getElementById("AnswerBox"+[QNo]).style.background="#30cfc0";
        }
    }

    document.getElementById("NotAnswerMark").checked=false;
        
        if (who=="Next")
        {
            QNo++;
        }else if (who=="Back")
        {
           QNo--;    
        }
        else
        {
            QNo=who;
        }
        
}


var CheckAnswer= function(who) //CALLED by Next Question To verify whether all the answer are Marked
{
    let NotAnswered="";
    let Completed = true;
    if (who=="SubmitTest")
    {
        for(let q=1;q<User.Score.length;q++)
        {
            if(User.Score[q]=="NotAnswer")
            {
                NotAnswered += q+",";
                Completed = false;
            }
        }
    }
    
    if (Completed == false)
    {    $('#basicExampleModal').modal('toggle');
        $('#ModalMessage').html("You Havan't answer the the following Questions : "+NotAnswered+"<br Still Do You want to Submit>");  
    }
    else
    {
        $('#basicExampleModal').modal('toggle');
        $('#ModalMessage').html("Are You Sure Do you Want To Submit");  
    }
}

function SubmitTest(who)
{
    GetAnswer("Next")
    if(who == "No")
    {
        console.log(QNo)
        NotAnswered="";
        QNo--;
        console.log(QNo)
    }
    if (who == "Yes")
    {
        for(let q=1;q<User.Score.length;q++) // Here let q is the QuestionNo. as well as AnswerNo. And i is used for Itration
        {

            if(Questions[q].AnswerType=="MCQ")
            {
                if(User.Score[q]==Questions[q].CorrectOpt)
                {
                    User.Score[Total]++;
                    console.log("Mark MCQ "+User.Score[Total]);
                }    
            }
            else
            {
                let MCAMark = (1/Questions[q].CorrectOpt.length);
                for(let i=0;i<Questions[q].CorrectOpt.length;i++)
                {    
                    if (User.Score[q].indexOf(Questions[q].CorrectOpt[i])!=-1)
                    {
                        User.Score[Total]=(User.Score[Total]+MCAMark); 
                    }

                }
            }
        }
        
        localStorage.setItem('UserDetails',User); // Save The User in the Local storage and Used In Check Answer.js
        
        var myJsonString = JSON.stringify(User);
        var blob = new Blob([myJsonString], {
            type: "application/json;charset=charset=utf-8"
        }
    
        );
        
        var userLink = document.createElement('a');
        userLink.setAttribute('download',"Result"+".json" );
        userLink.setAttribute('href',window.URL.createObjectURL(blob));
        userLink.click();
        //saveAs(blob, StudntDtl2[0].EmployeeId+".txt");

        document.getElementById("AnswerTag").style.display="none"; //AnswerTag Shows the Mcq Options
        document.getElementById("McqHeader").innerHTML="End of Test";
        document.getElementById("QuestionButton").style.display="none"; // Next and Backward button
        document.getElementById("McqContent").style.display="none";// Header
        $('#McqHeader').after("<a href='CheckAnswer.html' class='btn btn-secondary'>Check Answer</a>");
        document.getElementById("TimerDiv").style.display="none";
        $('#AnswerStatus').remove();
        localStorage.setItem("UserDetails",JSON.stringify(User));
    }

}

function StartTimer() 
{
    list:{
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
    if(m==-1)
    {   
        SubmitTest("Yes"); // after time get over calls the Submit test to submit
        break list;
    }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(StartTimer, 1000);
    }
}

function checkSecond(sec) 
{
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function CreateAnswerBox () 
{
   let Row = $("<div class='row row-horizontal rounded AnswerTableRow' id='AnswerTableRow' ></div>")
   let length = Questions.length;
   for(let q=1;q<=(length-1);q++)
   {
       let col = $("<div class='col text-center' id='AnswerBox"+q+"' onclick='NextQuestion("+q+")'>"+q+"</div>")
       $(Row).append(col);
   }

   $('#AnswerStatus').append(Row);
}


