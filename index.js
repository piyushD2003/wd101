document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dobInput = document.getElementById('dob');
    const checkOut = document.getElementById('check');
    const storedDetails = document.getElementById('storedDetails');

    // Helper function to calculate age from DOB
    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Function to validate the form fields
    const validateForm = () => {
      let isValid = true;

      // Validate Name
      if (nameInput.value.trim() === '') {
        document.getElementById('popupName').style.display = 'inline';
        isValid = false;
      } else {
        document.getElementById('popupName').style.display = 'none';
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        document.getElementById('popupEmail').style.display = 'inline';
        isValid = false;
      } else {
        document.getElementById('popupEmail').style.display = 'none';
      }

      // Validate Password
      if (passwordInput.value.trim() === '') {
        document.getElementById('popupPassword').style.display = 'inline';
        isValid = false;
      } else {
        document.getElementById('popupPassword').style.display = 'none';
      }

      // Validate DOB (Age between 18 and 55)
      const age = calculateAge(dobInput.value);
      if (isNaN(age) || age < 18 || age > 55) {
        document.getElementById('popupDob').style.display = 'inline';
        isValid = false;
      } else {
        document.getElementById('popupDob').style.display = 'none';
      }
      
      return isValid;
    };

    // Function to store data in local storage
    const storeDataInLocalStorage = () => {
      const userDetails = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value, // Note: Storing plain passwords is not secure. Consider hashing in real-world cases.
        dob: dobInput.value,
        check:checkOut.checked
      };
      localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
    };

    // Function to display stored data
    const displayStoredData = () => {
        ihtml=""
        ihtml +=`<tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Date of Birth</th>
        <th>Accepted Term?</th>
      </tr>`
        for (let i = 0; i < localStorage.length; i++) {
            let storedData = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (storedData&& localStorage.key(i)==storedData.email) {
                ihtml +=`<tr>
                    <td>${storedData.name}</td>
                    <td>${storedData.email}</td>
                    <td>${storedData.password}</td>
                    <td>${storedData.dob}</td>
                    <td>${storedData.check}</td>
                </tr>`

            } else {
              ihtml += `<p>No details stored yet.</p>`;
            }
            document.getElementById('mytable').innerHTML = ihtml
        }
    };

    // Initial load: Display stored data
    displayStoredData();

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form from submitting

      if (validateForm()) {
        storeDataInLocalStorage();
        displayStoredData();
      } else {
        alert('Please correct the errors before submitting.');
      }
    });
  });
