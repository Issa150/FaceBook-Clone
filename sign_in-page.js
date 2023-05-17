// --------------*** Modul fonctionality ***-----------------
const openModul = document.querySelector('.btn_secoundary')
    const Mymodul = document.getElementById('modal')
    const closeBtn = document.querySelector('.svg-close')
    openModul.addEventListener('click', (e)=>{
        e.preventDefault();
        Mymodul.showModal()
    })
    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        Mymodul.close()
    })

    // --------------***  navigation buttons in modal ***-----------------
    const next_btn = document.querySelector('#modal #next');
    const prev_btn = document.querySelector('#modal #prev');
    const bigWrapper = document.querySelector('.inner_wrapper')

    next_btn.onclick = (e)=>{
      event.preventDefault()
      bigWrapper.style.transform = 'translateX(-50%)'
    }
    prev_btn.onclick = (e)=>{
      event.preventDefault()
      bigWrapper.style.transform = 'translateX(0)'
      }


    // --------------*** Sign up START ***-----------------
    const signup_form = document.querySelector('#modal form');
    const f_name_in = document.querySelector('#modal #first_name');
    const l_name_in = document.querySelector('#modal #last_name');
    const email_up_in = document.querySelector('#sign_up-email');
    const pass_up_in = document.querySelector('#sign_up-password');
    const birthdate_in = document.querySelector('#modal #birthday');
    
// -------- Adding image from device to Session storage and to image holder------------
    const HTMLfile = document.querySelector('.img-ptofile #file')
    const myLabel = document.querySelector('.img-ptofile label')
    const imgPostHolder = document.querySelector('.img-ptofile label img')
    
    HTMLfile.addEventListener('change',selectFile)
    function selectFile(){
      const reader = new FileReader()
      reader.readAsDataURL(this.files[0])
      
      reader.addEventListener('load',()=>{
        imgPostHolder.setAttribute('src', reader.result)
        imgPostHolder.style.display = 'block'
      })
      
      // selectFile() ENDED  //////
    }
    
    const signup_btn = document.querySelector('#submit');
    
    
    // signup_form.onsubmit = function(e){signup(e)}
    signup_btn.onclick = (e)=>{signup()}
    
    let index = 0;
    let my_infos = [];


const signup = (e)=>{
    event.preventDefault()
    //------- Getting recent values --------
    const first_name = f_name_in.value
    const last_name = l_name_in.value.toUpperCase()
    const email = email_up_in.value
    const pass = pass_up_in.value
    const birthdate = birthdate_in.value
    const gender_selected = document.querySelector('.gender input[name=sex]:checked')
    const gender = gender_selected.value
    const profileImage = imgPostHolder.src
    
    index++;
    let myInfo = {
        First_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
        Last_name: last_name,
        Full_name: first_name + ' ' + last_name,
        Email: email,
        Password: pass,
        Birthdate: birthdate,
        Gender: gender,
        Profile_image: profileImage
    }
    my_infos.push(myInfo);
    document.forms[1].reset();

    let jsonUsers = JSON.stringify(my_infos);
    
    sessionStorage.setItem(`my infos =>`, jsonUsers)
    
    const storageString = sessionStorage.getItem('my infos =>')
    const parsedInfo = JSON.parse(storageString)
    const chatemail = parsedInfo[0].Email;
    console.log(chatemail);

    signup_form.submit()
    alert ('Submision is done!')
    /////////////console.log(JSON.parse(sessionStorage.getItem('my infos =>')))

}

// --------------!!! Sign up ENDED !!!-----------------

// --------------!!! Sign in STARTED !!!-----------------


// --------------  password visiblity  --------------
const btnVisible = document.querySelector('form#sign_in label img')
const inputType = document.querySelector('form#sign_in input[type=password]')
btnVisible.onclick = function(){
  if (inputType.type == "password"){
    inputType.type = "text"
    btnVisible.setAttribute("src","images/eye_close.svg")
  }else{
    inputType.type = "password"
    btnVisible.setAttribute("src","images/eye_open.svg")

  }
}

// --------------*** Sign in function ***-----------------
const email_in_in = document.querySelector('#sign_in-email')
const pass_in_in = document.querySelector('#sign_in-password')
const result = document.querySelector('.result')
const form = document.querySelector('form#sign_in')

form.onsubmit = (e)=>{validation(e)}
const validation = (e)=>{
  event.preventDefault();

  const email_sin = email_in_in.value;
  const pass_sin = pass_in_in.value;

  document.forms[0].reset();

  if (sessionStorage.length === 0) {
    result.innerHTML = 'No account found! Please create a new account';
  } 
  else{
    var main_user = sessionStorage.getItem('my infos =>');
    var datas = JSON.parse(main_user)
    
    datas.forEach(data => {
      if(!email_sin && !pass_sin){
          result.innerHTML = 'These fields could not be empty!';
          result.style.color="darkred"
      }else if(email_sin == data.Email && pass_sin == data.Password){
          result.innerHTML = 'Welcome🤩...';
          result.style.color="lightgreen"
          window.location.href = "home.html";
      }else if(sessionStorage.length === 0){
        result.innerHTML = 'No account founded! Please create a new account';
      }else{
          result.innerHTML = 'Either password or Username is wrong!';
          result.style.color="darkred"

      }
    });
  } 
    
}