
// Initialize login state
let loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;


function updateLoginButton() {
    const loginButton = document.getElementById('login_button');
    if (loggedIn) {
        loginButton.textContent = 'Logout';
        loginButton.removeEventListener('click', openLoginModal);
        loginButton.addEventListener('click', logout);
    } else {
        loginButton.textContent = 'Login';
        loginButton.removeEventListener('click', logout);
        loginButton.addEventListener('click', openLoginModal);
    }
}

// Function to handle login
function login() {
    loggedIn = true; // Set this to true upon successful login
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn)); // Persist login state
    updateLoginButton(); // Update the login button
    closeLoginModal(); // Close the modal upon successful login
}

// Function to handle logout
function logout() {
    loggedIn = false;
    localStorage.removeItem('loggedIn'); // Remove the login state from localStorage
    updateLoginButton(); // Update the login button
}

// Function to open the login modal
function openLoginModal() {
    document.getElementById('login_modal').style.display = 'block';
}

// To open login modal
document.getElementById('login_button').addEventListener('click', function() {
    if (!loggedIn) {
        openLoginModal();
    }
});

// To open signin model
document.getElementById('signup_button').addEventListener('click', function(){
    document.getElementById('signup_model').style.display = 'block';
});

// Switch from Login to Sign Up Modal
document.getElementById('OpenSignUp_form').addEventListener('click', function() {
    document.getElementById('login_modal').style.display = 'none';
    document.getElementById('signup_model').style.display = 'block';
});

// Switch from Sign Up to Login Modal
 document.getElementById('OpenLogin_form').addEventListener('click', function() {
    document.getElementById('signup_model').style.display = 'none';
    document.getElementById('login_modal').style.display = 'block';
});

// Close the login modal
function closeLoginModal() {
    document.getElementById('login_modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}
// Close the signup modal
function closeSingnUpModal() {
    document.getElementById('signup_model').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Show the login modal when interacting with the calculator or other sections
function showLoginModal() {
    document.getElementById('login_modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
}

// Handle signup form submission
document.getElementById('SignUp_form').addEventListener('submit', function(event){
    event.preventDefault();

    //Get the input values 
    const username = document.getElementById('signup_username').value;
    const password = document.getElementById('signup_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

     // Log values to console for debugging
     console.log('Username:', username);
     console.log('Password:', password);
     console.log('Confirm Password:', confirmPassword);
 
    // Clint side validation
    if(username === '' || password === '' || confirmPassword === '') {
        document.getElementById('SignUp_message').textContent ='Please enter all the fields'
        document.getElementById('SignUp_message').style.color = 'red';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('SignUp_message').textContent = 'Passwords do not match.';
        document.getElementById('SignUp_message').style.color = 'red';
        return;
    }

    // store the credential to local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    document.getElementById('SignUp_message').textContent = 'SignUp successful! You can now login.';
    document.getElementById('SignUp_message').style.color = 'green';

});

// Handle login form submission
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

     // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Get the input values
    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;

    // Log values to console for debugging
    console.log('Login Username:', username);
    console.log('Login Password:', password);
    console.log('Stored Username:', storedUsername);
    console.log('Stored Password:', storedPassword);



    // Simple client-side validation (for demonstration purposes)
    if (username === '' || password === '') {
        document.getElementById('login_message').textContent = 'Please enter both username and password.';
        document.getElementById('login_message').style.color = 'red';
        return;
    }

    // Check if the entered credentials match the stored ones
    if (username === storedUsername && password === storedPassword) {
        login(); // Set login state and update button
    } else {
        document.getElementById('login_message').textContent = 'Invalid username or password.';
        document.getElementById('login_message').style.color = 'red';
    }
});

// Ensure the login button is updated when the page loads
window.addEventListener('load', function () {
    updateLoginButton();
});


function appendToCalc(value){
    const display= document.getElementById('calc_display');
    display.value += value;
}

function clearCalc(){
    const display= document.getElementById('calc_display');
    display.value = '';
}

function calculateResult() {
    if(!loggedIn){
        showLoginModal();
        return;
    }
    const display = document.getElementById('calc_display');
    try {
        display.value = eval(display.value) || '';
    } catch (e) {
        display.value = 'Error';
    }
}
// This function is to create a Table
function generate_table(){
    if(!loggedIn){
        showLoginModal();
        return;
    }
    const num = document.getElementById('input_table').value;
    const tableResult = document.getElementById('table_result');

    if (num === ''){
        alert('Please Enter a number.');
        return;
    }

    let table =' <table><tr><th>Multiplier</th><th>Result</th></tr>';

    for( let i = 1; i<= 10; i++){
        table += `<tr><td>${num} x ${i}</td><td>${num * i}</td></tr>`;
    }
    table += '</table>';
    tableResult.innerHTML = table;
   
}
// This function is to create a Roots
function calculateSqrt(){
    if(!loggedIn){
        showLoginModal();
        return;
    }
    const num = parseFloat(document.getElementById('root_input').value);
    const rootResult = document.getElementById('root_result');

    if (isNaN(num)){
        alert('Please Enter a number.');
        return;
    }

    const sqrt = num * num;
    const cbrt = num * num * num;

    rootResult.innerHTML = `
     <table>
            <tr><th>Square Root</th><td>${sqrt.toFixed(2)}</td></tr>
            <tr><th>Cube Root</th><td>${cbrt.toFixed(2)}</td></tr>
        </table>
    `;
}

// Check login state on page load
//window.addEventListener('load', function () {
    loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
    updateLoginButton(); // Ensure the button is updated on page load
//});

// Other Calculator

document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listeners to the calculator links
    const calcLinks = document.querySelectorAll('.calc-links a');
    calcLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const calculatorId = this.getAttribute('onclick').match(/'(\w+)'/)[1];
            showCalculator(calculatorId);
        });
    });
});
function showCalculator(id) {
    if(!loggedIn){
        showLoginModal();
        return;
    }
    // Hide all calculators
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calculator => {
        calculator.classList.remove('active');
    });

    // Show the selected calculator
    const selectedCalculator = document.getElementById(id);
    if (selectedCalculator) {
        selectedCalculator.classList.add('active');
    }
}

function calculateAge() {
    const birthDateInput = document.getElementById('birth-date').value;
    const currentDateInput = document.getElementById('current-date').value;

    // Return if either date is not selected
    if (!birthDateInput || !currentDateInput) {
        document.getElementById('age-result').innerHTML = "Please select both dates.";
        return;
    }

    const birthDate = new Date(birthDateInput);
    const currentDate = new Date(currentDateInput);

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += daysInPreviousMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('age-result').innerHTML = `Age: ${years} years, ${months} months, ${days} days`;
}
// Geometry calculator
function updateForm() {
    const shape = document.getElementById('shape').value;
    const forms = document.querySelectorAll('.shape-form');

    forms.forEach(form => {
        form.style.display = 'none'; // Hide all forms
    });

    document.getElementById(`${shape}-form`).style.display = 'block'; // Show selected form
}
// Rectangle Shape
function calculateRectangle() {
    const length = parseFloat(document.getElementById('rect-length').value);
    const breadth = parseFloat(document.getElementById('rect-width').value);

    if (!isNaN(length) && !isNaN(breadth)) {
        const area = length * breadth;
        const perimeter = 2 * (length + breadth);

        document.getElementById('rect-area').textContent = `Area: ${area}`;
        document.getElementById('rect-perimeter').textContent = `Perimeter: ${perimeter}`;
    } else {
        document.getElementById('rect-area').textContent = 'Area: Invalid input';
        document.getElementById('rect-perimeter').textContent = 'Perimeter: Invalid input';
    }
}
// Circle Shape
function calculateCircle() {
    const radius = parseFloat(document.getElementById('circle-radius').value);

    if (!isNaN(radius)) {
        const area = Math.PI * Math.pow(radius, 2);
        const circumference = 2 * Math.PI * radius;

        document.getElementById('circle-area').textContent = `Area: ${area.toFixed(2)}`;
        document.getElementById('circle-circumference').textContent = `Circumference: ${circumference.toFixed(2)}`;
    } else {
        document.getElementById('circle-area').textContent = 'Area: Invalid input';
        document.getElementById('circle-circumference').textContent = 'Circumference: Invalid input';
    }
}
// Square Shape
function calculateSquare(){
    const side = parseFloat(document.getElementById('square-side').value);

    if(!isNaN(side)){
        const area = Math.pow(side, 2);
        const perimeter = 4 * side;

        document.getElementById('square-area').textContent = `Area: ${area}`;
        document.getElementById('square-perimeter').textContent = `Perimeter: ${perimeter}`;
    }else {
        document.getElementById('square-area').textContent = 'Area: Invalid input';
        document.getElementById('square-perimeter').textContent = 'Perimeter: Invalid input';
    }
}
//Polygon Shape
function calculatePolygon() {
    const sides = parseInt(document.getElementById('polygon-sides').value);
    const sideLength = parseFloat(document.getElementById('polygon-side').value);

    if (!isNaN(sides) && sides >= 3 && !isNaN(sideLength)) {
        const perimeter = sides * sideLength;
        const apothem = sideLength / (2 * Math.tan(Math.PI / sides));
        const area = (perimeter * apothem) / 2;

        document.getElementById('polygon-area').textContent = `Area: ${area.toFixed(2)}`;
        document.getElementById('polygon-perimeter').textContent = `Perimeter: ${perimeter}`;
    } else {
        document.getElementById('polygon-area').textContent = 'Area: Invalid input';
        document.getElementById('polygon-perimeter').textContent = 'Perimeter: Invalid input';
    }
}
// Triangle Shape
function calculateTriangle() {
    const base = parseFloat(document.getElementById('tri-base').value);
    const height = parseFloat(document.getElementById('tri-height').value);
    const side1 = parseFloat(document.getElementById('tri-side1').value);
    const side2 = parseFloat(document.getElementById('tri-side2').value);
    const side3 = parseFloat(document.getElementById('tri-side3').value);

    if (!isNaN(base) && !isNaN(height) && !isNaN(side1) && !isNaN(side2) && !isNaN(side3)) {
        const area = (base * height) / 2;
        const perimeter = side1 + side2 + side3;

        document.getElementById('triangle-area').textContent = `Area: ${area}`;
        document.getElementById('triangle-perimeter').textContent = `Perimeter: ${perimeter}`;
    } else {
        document.getElementById('triangle-area').textContent = 'Area: Invalid input';
        document.getElementById('triangle-perimeter').textContent = 'Perimeter: Invalid input';
    }
}

// Initialize the form display on page load
window.onload = function() {
    updateForm();
};


//Percentage Calculator
function calculatePercentage(){
    const obtainedMarks = parseFloat(document.getElementById('obtained-marks').value);
    const totalMarks = parseFloat(document.getElementById('total-marks').value);


// Validate 
if (isNaN(obtainedMarks)|| isNaN(totalMarks)|| totalMarks=== 0){
    document.getElementById('Percentage-result').innerHTML = "Please enter valid marks and ensure total marks is not zero";
    return;
}

// Calulate Percentage
const percentage = (obtainedMarks / totalMarks)* 100 ;
// Display Result
document.getElementById('Percentage-result').innerHTML = `Percentage: ${percentage.toFixed(2)}`;
}

// Travel Calculator 
function calculateSpeedDistanceTime(){
    const speedInput = document.getElementById('speed').value;
    const distanceInput = document.getElementById('distance').value;
    const timeInput = document.getElementById('time').value;


let speedResult = '';
let distanceResult = '';
let timeResult = '';

// Perform calculations
if (speedInput && distanceInput && !timeInput) {
    // Calculate time
    const time = distanceInput / speedInput;
    timeResult = `Time = ${time.toFixed(2)} hours`;
} else if (distanceInput && timeInput && !speedInput) {
    // Calculate speed
    const speed = distanceInput / timeInput;
    speedResult = `Speed = ${speed.toFixed(2)} km/h`;
} else if (speedInput && timeInput && !distanceInput) {
    // Calculate distance
    const distance = speedInput * timeInput;
    distanceResult = `Distance = ${distance.toFixed(2)} km`;
} else {
    alert('Please fill in exactly two values to calculate the third.');
}

// Display Results
document.getElementById('result-speed').textContent = speedResult;
document.getElementById('result-ditance').textContent = distanceResult;
document.getElementById('result-time').textContent = timeResult;
}