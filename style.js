var firstName = document.getElementById('Fname').value;
var middleName = document.getElementById('Mname').value;
var lastName = document.getElementById('Lname').value;
var age = document.getElementById('age').value;
var Operation;
var username = document.getElementById('username').value;
var userImage = document.getElementById('user-image').value;
var levelContainer = document.getElementById('level').value;
var level = 1;

var modal = document.querySelector(".modal");
var closeButton = document.getElementById('close');

const MAX_QUESTION = 15;
var questionCount = 0;
var qCountPara = document.getElementById('question-count').value;

var questions = [];
var incorrect = [];
var answer = [];

var ans = 0;
var correct = 0;
var currentOperation = ' ';
var progress = 0;
var question;
var passRate = 0;

function calculateAge(e)
{
    var currentYear = new Date().getFullYear();
    var dobYear = new Date(e.target.value).getFullYear();
    var calculatedAge = currentYear - dobYear;

    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var dob = new Date(e.target.value).toLocaleDateString("en-US", options);

    if(calculatedAge < 9 || calculatedAge > 12)
	{
        alert('This site is for 9 to 12 year olds!');
        age.value = '';
    } 
	else 
	{
        age.value = calculatedAge;
        localStorage.setItem("age", age.value);
        localStorage.setItem("dob", dob);
    }
}


function Quiz()
{
	document.getElementById('takeQuiz').value;
	{
		switch(quizType)
		{
			case 'addition':
				currentOperation = '+';
				generateQuestion('+');
			break;
        
			case 'subtraction':
				currentOperation = '-';
				generateQuestion('-');
			break;

			case 'multiplication':
				currentOperation = '*';
				generateQuestion('*');
			break;

			case 'division':
				currentOperation = '/';
				generateQuestion('/');
			break;
		}
	}
}

function generateQuestion(currentOperation) 
{
    qCountPara= (questionCount + 1) + "of"+ MAX_QUESTION;

    if (questionCount == 15)
	{
        if(questionCount + 1 == 16)
		{
            questionCount = 0;
            progress = 0;
            document.getElementById("progress").style.width = progress + '%';
            passRate = Math.floor((correct / MAX_QUESTION) * 100).toFixed(1);
            if (passRate >= 80) 
			{
                incrementLevel();
            } 
			else 
			{
                generateReport();
            }
        }
    }

    switch (currentOperation) 
	{
        case '+':
            var num = numbers();
            ans = num[0] + num[1];

            question = '<h1 class="title">What is ' + num[0] + ' + ' + num[1] + '?</h1>';

            document.getElementById('question-container').innerHTML = question + '<input type="text" placeholder="Your answer here" id="answer" min="1" required>';
            break;

        case '-':

            var num = numbers();
            ans = num[0] - num[1];

            question = '<h1 class="title">What is ' + num[0] + ' - ' + num[1] + '?</h1>';

            document.getElementById('question-container').innerHTML = question + '<input type="text" placeholder="Your answer here" min="1" id="answer" required>';
            break;

        case '*':

            var num = numbers();
            ans = num[0] * num[1];

            question = '<h1 class="title">What is ' + num[0] + ' x ' + num[1] + '?</h1>';

            document.getElementById('question-container').innerHTML = question + '<input type="text" placeholder="Your answer here" min="1" id="answer" required>';
            break;

        case '/':

            var num = numbers();
            ans = num[0] / num[1];

            question = '<h1 class="title">What is ' + num[0] + ' / ' + num[1] + '?</h1>';

            document.getElementById('question-container').innerHTML = question + '<input type="text" placeholder="Your answer here" min="1" id="answer" required>';
            break;
    }
    questionCount++;
}

function numbers()
{
    var num1 = 0;
	var num2 = 0;
    var lvl = level;
    switch(lvl)
	{
        case 1:
            num1 = Math.floor(1 + (Math.random() * 9));
            num2 = Math.floor(1 + (Math.random() * 9));
        break;

        case 2:
            num1 = Math.floor(1 + (Math.random() * 9));
            num2 = Math.floor(10 + (Math.random() * 99));
        break;

        case 3:
            num1 = Math.floor(10 + (Math.random() * 99));
            num2 = Math.floor(10 + (Math.random() * 99));
        break;

        case 4:
            num1 = Math.floor(10 + (Math.random() * 99));
            num2 = Math.floor(100 + (Math.random() * 999));
        break;

        case 5:
            num1 = Math.floor(100 + (Math.random() * 999));
            num2 = Math.floor(100 + (Math.random() * 999));
        break;

        case 6:
            num1 = Math.floor(100 + (Math.random() * 999));
            num2 = Math.floor(1000 + (Math.random() * 9999));
        break;

        case 7:
            num1 = Math.floor(1000 + (Math.random() * 9999));
            num2 = Math.floor(1000 + (Math.random() * 9999));
        break;

        case 8:
            num1 = Math.floor(1000 + (Math.random() * 9999));
            num2 = Math.floor(10000 + (Math.random() * 99999));
        break;

        case 9:
            num1 = Math.floor(10000 + (Math.random() * 99999));
            num2 = Math.floor(10000 + (Math.random() * 99999));
        break;

        case 10:
            num1 = Math.floor(10000 + (Math.random() * 99999));
            num2 = Math.floor(100000 + (Math.random() * 999999));
        break;
    }
    return [num1, num2];
}

function generateReport()
{
    document.getElementById('report-container').style.display = 'block';

    hideQuizElements();

    document.getElementById('pass-rate').innerText = 'Pass rate: ' + passRate + '%';

    for(var i = 0; i < incorrect.length; i++)
	{
        document.getElementById('incorrectQuestions').innerHTML +=
            '<div>' +
                incorrect[i] +
            '</div>' +
            '<div class="divider"></div>';
    }
}

function backToSelection() 
{
    questions = [];
    incorrect.splice(0, incorrect.length);
    questionCount = 0;
    progress = 0;
    document.getElementById('report-container').style.display = 'none';
    hideQuizElements();
    operation.style.display = 'block';
}

function readURL(input) 
{
    if (input.files && input.files[0]) 
	{
      var reader = new FileReader();
  
      reader.onload = function(e) 
	  {
        localStorage.setItem("image", e.target.result);
      }
  
      reader.readAsDataURL(input.files[0]);
    }
}

function hideQuizElements()
{
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    qCountPara.style.display = 'none';
}

function showQuizElements() 
{
    document.getElementById('action-buttons').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('progress-container').style.display = 'block';
    qCountPara.style.display = 'block';
}


function registerUser()
{
    localStorage.setItem("Name", firstName.value + " " + middleName.value + " " + lastName.value);
    localStorage.setItem("Gender", document.querySelector('input[name=gender]:checked').value);
}

function incrementLevel()
{
    levelContainer.innerHTML = ++level;
    passRate = 0;
    toggleModal();
}

function toggleModal() 
{
    modal.classList.toggle("show-modal");
}

closeButton.addEventListener('click', toggleModal);

function windowOnClick(event) 
{
    if (event.target === modal) 
	{
        toggleModal();
    }
}

document.getElementById('btn-quit').addEventListener('click', function()
{
    if(confirm('Exit test?'))
	{
        location.reload();
    }
});

document.getElementById('btn-next').addEventListener('click', function()
{
    var answerInput = document.getElementById('answer');
    console.log(answerInput.value.length);

    if(answerInput.value.length != 0)
	{
        progress += 6.66667;
        document.getElementById('progress').style.width = progress + '%';
        questions.push(question);
        answer.push(ans);
        if(document.getElementById('answer').value == ans)
		{
            correct++;
        } 
		else 
		{
            incorrect.push(question);
        }

        generateQuestion(currentOperation);
    } 
	else 
	{
        alert('Please enter an answer')
    }
});

