const select = document.querySelectorAll('.selectBtn');
const option = document.querySelectorAll('.option');
let index = 1;

select.forEach(a => {
	a.addEventListener('click', b => {
		const next = b.target.nextElementSibling;
		next.classList.toggle('toggle');
		next.style.zIndex = index++;
	})
})
option.forEach(a => {
	a.addEventListener('click', b => { 
		b.target.parentElement.classList.remove('toggle');
		const parent = b.target.closest('.select').children[0];

		parent.setAttribute('data-type', b.target.innerHTML);

		parent.innerHTML = b.target.innerHTML;
	})
});
$( function() {
    $( "#sourcedatepicker" ).datepicker();
	$( "#destinationdatepicker" ).datepicker();
} );


function showError(message) {
  document.getElementById("errorMessage").innerText = message;
  document.getElementById("customErrorBox").classList.remove("hidden");
}

document.getElementById("closeErrorBox").addEventListener("click", function () {
  document.getElementById("customErrorBox").classList.add("hidden");
});

$(function() {
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  // Independent autocomplete for From and To fields
  $("#from").autocomplete({
    source: countries,
    minLength: 2
  });

  $("#to").autocomplete({
    source: countries,
    minLength: 2
  });

  // const fromInput = document.getElementById('from');
  // const destinationInput = document.getElementById('to');

  // if (fromInput && destinationInput) {
  //   fromInput.addEventListener('input', () => {
  //     destinationInput.value = fromInput.value;
  //   });
  // }

  document.querySelectorAll('.triptype button').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove 'ishere' from all buttons
      document.querySelectorAll('.triptype button').forEach(b => b.classList.remove('ishere'));
  
      // Add 'ishere' to the clicked one
      btn.classList.add('ishere');
    });
  });
  
  
  
  // Get Quote button click handler
$("#getQuoteBtn").on("click", function () {
  const from = $("#from").val().trim();
  const to = $("#to").val().trim();
  const departureDate = $("#sourcedatepicker").val().trim();
  const arrivalDate = $("#destinationdatepicker").val().trim();
  const passengers = $(".select").eq(2).find(".selectBtn").text().trim();
  const travelClass = $(".select").eq(3).find(".selectBtn").text().trim();
  const tripType = $(".triptype button.ishere").text().trim();

  // Basic validation
  if (!from || !to || !departureDate || !arrivalDate ||
    passengers === "Pls select The Number of Passengers" ||
    travelClass === "Pls select Your Travel Class" || !tripType) {
    showError("Please complete all fields before continuing.");
    return;
  }

  if (!countries.includes(from)) {
    showError("'From' location is not a recognized country. Please select a valid country from the list.");
    return;
  }
  
  if (!countries.includes(to)) {
    showError("'To' destination is not a recognized country. Please select a valid country from the list.");
    return;
  }

  // Compare dates
  const depDate = new Date(departureDate);
  const arrDate = new Date(arrivalDate);

  if (arrDate < depDate) {
    showError("Arrival date cannot be earlier than departure date.");
    return;
  }

  // If everything is valid, show receipt
  let receiptHtml = `
    <p><strong>Trip Type:</strong> ${tripType}</p>
    <p><strong>From:</strong> ${from}</p>
    <p><strong>To:</strong> ${to}</p>
    <p><strong>Departure Date:</strong> ${departureDate}</p>
    <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
    <p><strong>Passengers:</strong> ${passengers}</p>
    <p><strong>Class:</strong> ${travelClass}</p>
  `;

  $("#receiptContent").html(receiptHtml);
  $("#receiptContainer").show();
});

  // Print Receipt button click handler
  $("#printReceiptBtn").on("click", function() {
    const printContents = document.getElementById("receiptContainer").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  });
});


// option.forEach(a => {
//   a.addEventListener('click', b => { 
//     const selectContainer = b.target.closest('.select');
//     const selectBtn = selectContainer.querySelector('.selectBtn');

//     selectBtn.classList.remove('disabled');
//     selectBtn.style.pointerEvents = 'auto';
//     selectBtn.style.color = ''; // restore normal color

//     b.target.parentElement.classList.remove('toggle');
//     selectBtn.setAttribute('data-type', b.target.getAttribute('data-type'));
//     selectBtn.innerHTML = b.target.innerHTML;
//   });
// });
