(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // let btn = document.querySelector("red");

  // addEventListener("click",()=>{
  //   alert("*Do you want delete this file*")
  // })

  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("click",()=>{
       let tax = document.getElementsByClassName("hidden");
       for(info of tax){
        if(info.style.display!= "inline"){
            info.style.display= "inline";
        }
        else{
            info.style.display= "none";
        }
        
       }
    });
    
