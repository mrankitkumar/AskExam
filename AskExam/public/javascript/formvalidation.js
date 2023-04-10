// Get form elements
const signUpForm = document.getElementById("sign-up-form");
const loginForm = document.getElementById("login-form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const rePasswordInput = document.getElementById("re-password-input");


// Define validation functions
function validateSignUpForm() 
{
  
  
  // Check if name field is empty
  if (nameInput.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter name',
      timer: 2000
      
    })
    return false;
  }
  
  // Check if email field is empty or not a valid email address
  if (emailInput.value.trim() === "") 
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter email',
      timer: 2000
      
    })
    return false;
  } 
  else if (!isValidEmail(emailInput.value.trim())) 
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter valid email',
      timer: 2000
      
    })
    return false;
  }
  
  // Check if password field is empty or less than 8 characters
  if (passwordInput.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter Password',
      timer: 2000
      
    })
    return false;
  } else if (passwordInput.value.trim().length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password is less then 8',
      timer: 2000
      
    })
    return false;
  }
  
  // Check if re-entered password field matches password field
  if (rePasswordInput.value.trim() !== passwordInput.value.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Repassword not same as password',
      timer: 2000
      
    })
    return false;
  }
  
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Your account has successfully created',
    showConfirmButton: false,
    timer: 1500
  })
  // Submit form if all fields are valid
  signUpForm.submit();
}

function validateLoginForm() {
  
  
  // Check if email field is empty or not a valid email address
  if (emailInput.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter email',
      timer: 1500
      
    })
    return false;
  } 
  else if (!isValidEmail(emailInput.value.trim())) 
  {
    Swal.fire({
      icon: 'success',
      position: 'top-middle',
      text: 'Please enter valid email',
      timer: 1500
      
    })
    return false;
  }
  
  // Check if password field is empty
  if (passwordInput.value.trim() === "") 
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Enter Password',
      timer: 1500
    })
   
    return false;
  }
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Login Successful',
    showConfirmButton: false,
    timer: 1000,
  })
  loginForm.submit();
}

// Helper function to check if email is valid
function isValidEmail(email) {
  // Regex to check if email address is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function checkmywall()
{
  const file = document.getElementById("photo");
  if (file.value.trim() === "")
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please select Photo',
      timer: 2000
      
    })
    return false;
  }
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Profile Updated',
    showConfirmButton: false,
    timer: 1500
  })
}
function savedetails()
{
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Profile Updated',
    showConfirmButton: false,
    timer: 2000,
  })
  return true;
}
function checkefile()
{
  const efile = document.getElementById("efile");
  const title = document.getElementById("title");
  
   if(title.value.trim()==="")
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Title of document required',
      timer: 2000
      
    })
    return false;
  }
 else if(efile.value.trim()==="")
  {
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Upload Correct Document',
      timer: 2000
      
    })
    return false;
  }

  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Your document is Uploaded',
    showConfirmButton: false,
    timer: 1500,
  })
}
// post validations
function posts()
{
  const post = document.getElementById("postdetail");
  if (post.value.trim() === "")
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Write Post',
      timer: 2000
      
    })
    return false;
  }
}
// comments

