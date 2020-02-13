//Listen for submit on the form
document.getElementById('loan-form').addEventListener('submit', function(e){
//hide results
document.getElementById('results').style.display = 'none'

//hide results
document.getElementById('loading').style.display = 'block'

setTimeout(calculateResults, 2000)
  e.preventDefault()
})

function calculateResults(){
const amount = document.getElementById('amount')
const interest = document.getElementById('interest')
const years = document.getElementById('years')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')

//calculating the principal
const principal = parseFloat(amount.value)

//calculating the interest
const calculatedInterest = parseFloat(interest.value) / 100 / 12

//calculating payments
const calculatedPayments = parseFloat(years.value) * 12

//compute monthly payments
const x = Math.pow(1 + calculatedInterest, calculatedPayments)
const monthly = (principal * x * calculatedInterest)/ (x-1)

if(isFinite(monthly)){
  monthlyPayment.value = monthly.toFixed(2)
  totalPayment.value = (monthly * calculatedPayments).toFixed(2)
  totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

//show results
  document.getElementById('results').style.display = 'block'

//hide loading gif
  document.getElementById('loading').style.display = 'none'


} else {
  showError('Please check your numbers')
}
}

//Show Error function
function showError(error){

  //hide loader and results
document.getElementById('results').style.display = 'none'
document.getElementById('loading').style.display = 'none'
  //create a div
  const errorDiv = document.createElement('div')

  //get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  //add class
  errorDiv.className = 'alert alert-danger'

  //create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error))

  //insert error above heading
  // card is parent, insert the errorDiv before heading
  card.insertBefore(errorDiv, heading)

  //clears error after 3 seconds
  setTimeout(clearError, 3000)
}

//after 3 seconds, errorDiv is removed
function clearError(){
  document.querySelector('.alert').remove()
}
