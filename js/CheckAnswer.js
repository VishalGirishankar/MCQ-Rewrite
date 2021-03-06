$.getJSON("questions.json",function(data){ Questions=data });
var User = JSON.parse(localStorage.getItem("UserDetails"));

console.log(User);


var OptionToNum = function(Opt) // to use convert Alpha options to numeric options 
{
    if(Opt=='A') return 1;
    else if (Opt=='B') return 2;
    else if(Opt=='C') return 3;
    else if(Opt=='D')
    return 4;
    else if(Opt=='E')
    return 5;
}

var CheckAnswerShow =function() // Onclick event of button #CheckAnswer
{
    $("#CheckAnswerBtn").remove();
    $('jumbotron').append("<div class='text-center'>Answer Review</div>");
    for (let i = 1; i <Questions.length; i++)  // loop to create tables based on the number of Questions
    {   
        
        let container = $("<div class = 'container' id='Row"+i+"'></div>");
        let row = $("<div class = 'row' id='ShowQuestion"+i+"'></div>");
        let row2 = $("<div class = 'row'  id='WrongShowAnswer"+i+"'></div>");
        let row3 = $("<div class = 'row'  id='CorrectShowAnswer"+i+"'></div>");
        

        $(container).append(row);
        $(container).append(row2);
        $(container).append(row3);
        
        $('.jumbotron').append(container);
    }

    for(let i=1; i<Questions.length; i++)
    {
        $('#ShowQuestion'+i).html(i+". "+Questions[i].Question +"<br> <br>");
        if(Questions[i].AnswerType=="MCQ")
        {
            if(Questions[i].CorrectOpt==User.Score[i])
            {   
                let OptNum= OptionToNum(Questions[i].CorrectOpt);
                $( "#ShowQuestion"+i).after( "<div>Your Answer : </div>" );
                $('#CorrectShowAnswer'+i).html("&emsp;&emsp;"+Questions[i].Options[OptNum]+ " ----> "+"Correct <br> <br>");
                $('#CorrectShowAnswer'+i).css("color","green");
            }
            else if(User.Score[i]=="NotAnswer")
            {
                $( "#ShowQuestion"+i).after( "<div style='color:red'>You Haven't Answered the Question  : </div> <br>" );
                let CON = OptionToNum(Questions[i].CorrectOpt);
                $( "#WrongShowAnswer"+i).after( "<div>Correct Answer : </div>" );
                $('#CorrectShowAnswer'+i).html("&emsp;&emsp;"+Questions[i].Options[CON]+ "----> Is the Right Answer <br> <br>");
            }
            else
            {
                let CON = OptionToNum(Questions[i].CorrectOpt); // CON = Correct Option Number
                let WON = OptionToNum(User.Score[i]); // WON = Worng Option Number
                $( "#ShowQuestion"+i).after( "<div>Your Answer : </div>" );
                $('#WrongShowAnswer'+i).html("&emsp;&emsp;"+Questions[i].Options[WON]+ " ----> "+"Worng");
                $('#WrongShowAnswer'+i).css("color","red");
                $( "#WrongShowAnswer"+i).after( "<div>Correct Answer : </div>" );
                $('#CorrectShowAnswer'+i).html("&emsp;&emsp;"+Questions[i].Options[CON]+ "----> Is the Right Answer <br> <br>");

            }
        }
        else
        {
            if (Questions[i].CorrectOpt==User.Score[i])
            {
                $( "#ShowQuestion"+i).after( "<div>Your Answer : </div>" );
                 $('#CorrectShowAnswer'+i).html("&emsp;&emsp; ----> Is the Right Answer <br> <br>");
                 $('#CorrectShowAnswer'+i).css("color","green");
            }
            else if(User.Score[i]=="NotAnswer")
            {
                $( "#ShowQuestion"+i).after( "<div style='color:red'>You Haven't Answered the Question  : </div>  <br> " );
                $( "#WrongShowAnswer"+i).html( "<div>Correct Options Are : </div>" );
                for(let q=0;q<Questions[i].CorrectOpt.length;q++)
                {
                    let CON = OptionToNum(Questions[i].CorrectOpt[q])
                    $('#CorrectShowAnswer'+i).append("&emsp;&emsp;"+q+". "+Questions[i].Options[CON]+ " <br> <br>");
                }
            }
            else
            {
                $( "#ShowQuestion"+i).after( "<div>Your Answer : </div>" );
                $('#WrongShowAnswer'+i).html("&emsp;&emsp;  ----> "+"Worng <br>");
                $('#WrongShowAnswer'+i).css("color","red");
                $( "#WrongShowAnswer"+i).after( "<div>Correct Options are : </div>  " );
                for(let q=0;q<Questions[i].CorrectOpt.length;q++)
                {
                    let CON = OptionToNum(Questions[i].CorrectOpt[q])
                    $('#CorrectShowAnswer'+i).append("&emsp;&emsp;"+q+". "+Questions[i].Options[CON]+ " <br> <br>");
                }

            }
        }
    }

}

