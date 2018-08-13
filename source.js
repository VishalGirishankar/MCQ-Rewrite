var User = {

    Name:"",DoB:{},Score:[Total=0]
}

// var StudntDtl2 = JSON.parse(localStorage.getItem("StudntDtl"));
// console.log(StudntDtl2);
var Questions=[];
$.getJSON("questions.json",function(data){ Questions=data });  //parsing Json file to questions object

var Instruction=[];
$.getJSON("Instructions.json",function(data1){ Instruction=data1 }); //parsing Json file to Instruction object


var DisplayAnswerTable=function() //called by StartTest()
{
    for(let q=1; q<=(1);q++)
    {
        document.getElementById("AnswerTableRow"+[q]).style.visibility="visible";
    }
}

var InstructionLoad = function() // Take Test Onclick Event
{
    document.getElementById("TakeTest").style.display="none";
    document.getElementById("McqHeader").style.display="block";
    document.getElementById("McqContent").style.display="block";
    document.getElementById("McqHeader").innerHTML=Instruction[0].InstructionHeader;
    document.getElementById("McqContent").innerHTML=Instruction[1].InstructionSet[0];
    document.getElementById("StartTest").style.display="block";
}
var StartTest=function() //Start button on click event
{   
    
    document.getElementById("StartTest").style.display="none";
    
    document.getElementById("McqHeader").innerHTML=Questions[0].QuestionHeader;

    document.getElementById("AnswerTag").style.display="block";

    document.getElementById("QuestionButton").style.display="block";

    document.getElementById("TimerDiv").style.display="block";

    document.getElementById('timer').innerHTML =
  10 + ":" + 00;

  document.getElementById("NotAnswerMark").style.display="block";
    NextQuestion();

    DisplayAnswerTable();

    startTimer();

    
}

let NotAnswered="";

var CheckAnswer= function(who) //CALLED by Next Question To verify whether all the answer are Marked
{
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






var QNo=1; // itretion for Question number
var Allow=false
var NextQuestion = function(who) // Next, Back button onclick event
{
       
        if(Allow) // Allows To Get Answer if True And Vice Versa
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

            //console.log("On Display question = "+QNo);
            document.getElementById("McqContent").innerHTML=Questions[QNo].Question;
            
            for ( let q=0;q<4;q++)
            {
                document.getElementById("Row"+[q]).style.display="block";
                document.getElementById("Opt"+[q]).innerHTML=Questions[QNo].Options[q];
               // console.log("On option No. opt = "+q + ", " +QNo);
            }
            if(User.Score[QNo]!=undefined && User.Score[QNo]!="NotAnswer")
            {
                
                $(":input[value="+User.Score[QNo]+"]").attr('checked',true);
            }
            Allow=true;     
        }
        else
        {
            

            console.log(User.Score);
            CheckAnswer("NextQuestion");
            
        }

}
let RadioValue="";
var GetAnswer= function(who)
{
    
    //console.log("starting getanswer = "+QNo);
       
    if(document.querySelector('input[name="choice"]:checked'))
    {
        if(User.Score[QNo]==undefined || User.Score[QNo]=="NotAnswer")
        {
        RadioValue = document.querySelector('input[name="choice"]:checked').value;
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
        // if (RadioValue==Questions[QNo].Ans)
        // {
        //     User.Score[Total]++;
        //     User.Score[QNo]=1;
            

        // }
        // else
        // {
        //     User.Score[QNo]=0;
        // }
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
        //console.log("Ending getans = "+QNo);
    


    

    
}

var ShowResult= function()
{
    document.getElementById("ShowResult").style.display="none";
    document.getElementById("McqHeader").style.display="block";
    document.getElementById("McqHeader").innerHTML=" Correct Answer = "+User.Score[Total];
    document.getElementById("CheckAnswer").style.display="block";
    localStorage.setItem("UserDetails",JSON.stringify(User));
    

    for(let q=1;q<User.Score.length;q++)
    {
        if (User.Score[q]==Questions[q].CorrectOpt)
        {
            console.log("Show REsult yes"+User.Score[q]);
            
            document.getElementById("RAnsImg"+[q]).style.display="block";
        }
        else
        {
            console.log("Show REsult no"+User.Score[q]);
           
            document.getElementById("WAnsImg"+[q]).style.display="block";
        }
    }   
}






function startTimer() 
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
  setTimeout(startTimer, 1000);
    }
}

function checkSecond(sec) 
{
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}










