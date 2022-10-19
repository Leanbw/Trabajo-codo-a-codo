let validateBtn = document.getElementById("btn-submit");
validateBtn.addEventListener("click", validateSent);
function validateSent(){
    let contactForm = document.querySelector(".contact-form");
    let name = document.querySelector("#name-input");
    let mail = document.querySelector("#mail-input");
    let phone = document.querySelector("#phone-input");
    let comment = document.querySelector("#comment-input");
    let contador = 0;
    if (name.value.length < 3){
        alert("Debe ingresar un nombre")
        name.focus();
        return 0;
    }  
    for (let i = 0; i < mail.value.length; i++){
          
        if(mail.value[i] == "@"){
           contador += 1;           
        }     
    }
    if(contador == 0){
        alert("Ingresa un mail valido")
        return 0;
    }
    

    if (isNaN(parseInt(phone.value))){
        alert("Debe ingresar un telefono valido")
        phone.focus();
        return 0;
    }
    if (comment.value == ""){
        alert("Debe ingresar una consulta")
        comment.focus();
        return 0;
    }
    alert("Se ha enviado el formulario correctamente");
    contactForm.submit();
}
