
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
    $('#McqHeader').html(Questions[0].QuestionHeader);
    $('#AnswerTag').show();
    
    $('#QuestionButton').show();
    $('#QuestionButton').css({'display': 'flex',
        'justify-content': 'center'});
    $('#TimerDiv').show();
    $('#NotAnswerMark').show();
    $('#timer').html(10 + ":" + 00);

    NextQuestion();
    DisplayAnswerTable();
    StartTimer();
    
}

function DisplayAnswerTable () //called by StartTest()
{
    for(let q=1; q<=(1);q++)
    {
        document.getElementById("AnswerTableRow"+[q]).style.visibility="visible";
    }
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
            document.getElementById("NextQuestion").innerHTML="Submit";
        }
        else
        {
            document.getElementById("NextQuestion").innerHTML="Next";
        }

        if (QNo<(Questions.length))
        {

            $('#McqContent').html(Questions[QNo].Question);
            
            for (let q=0;q<4;q++) // to hide all the Rows 
            {
                console.log("Hide Row "+q)
                $('#Row'+q).hide();
            }
            let length = Questions[QNo].NumOption
            console.log(length)
            for ( let q=0;q<length;q++) // To the Required Rows
            {   
                console.log("Show Row "+q)
                $("#Row"+q).show();
                $("#Opt"+q).html(Questions[QNo].Options[q]);
                
            }
            console.log('Not in checked '+User.Score[QNo])
            if(User.Score[QNo]!=undefined && User.Score[QNo]!="NotAnswer")
            {
                console.log('Came in checked '+User.Score[QNo])
                $('#'+User.Score[QNo]).prop('checked',true);
            }
            Allow=true;     
        }
        else
        {
            

            console.log(User.Score);
            CheckAnswer("NextQuestion");
            
        }

}


var GetAnswer= function(who)
{
    
    //console.log("starting getanswer = "+QNo);
       
    if(document.querySelector('input[name="choice"]:checked'))
    {
       
        {
        let RadioValue = document.querySelector('input[name="choice"]:checked').value;
        document.querySelector('input[name="choice"]:checked').checked=false;
    
        User.Score[QNo]=RadioValue;
        document.getElementById("AnswerBox"+[QNo]).style.background="green";
        }
    }
    else
    {
        if(User.Score[QNo]==undefined)
        {
        User.Score[QNo]="NotAnswer";
        document.getElementById("AnswerBox"+[QNo]).style.background="red";
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
    if (who=="NextQuestion")
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
    {
        alert("You Have'nt Answered queation "+[NotAnswered])
        NotAnswered="";
        QNo--;
    }
    else
    {
        for(let q=1;q<User.Score.length;q++)
        {
            if(User.Score[q]==Questions[q].CorrectOpt)
            {
                User.Score[Total]++;
            }
        }

        
        var myJsonString = JSON.stringify(User);
        var blob = new Blob([myJsonString], {
            type: "application/json;charset=charset=utf-8"
        }
    
        );
        
        var userLink = document.createElement('a');
        userLink.setAttribute('download',"questions"+".json" );
        userLink.setAttribute('href',window.URL.createObjectURL(blob));
        userLink.click();
        //saveAs(blob, StudntDtl2[0].EmployeeId+".txt");

        document.getElementById("AnswerTag").style.display="none"; //AnswerTag Shows the Mcq Options
        document.getElementById("McqHeader").innerHTML="End of Test";
        document.getElementById("QuestionButton").style.display="none"; // Next and Backward button
        document.getElementById("McqContent").style.display="none";// Header
        document.getElementById("ShowResult").style.display="block";
        document.getElementById("TimerDiv").style.display="none";
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
        CheckAnswer("startTimer");
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