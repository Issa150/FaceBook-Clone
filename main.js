const settingsmenu = document.querySelector('.settings-menu')
const darkBtn = document.getElementById('dark-btn')

function settingMenuToggle(){
    settingsmenu.classList.toggle('settings-menu-height')
}

darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-btn-on")
    document.body.classList.toggle('dark-theme')

    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark")
    }else{
        localStorage.setItem("theme", "light")
    }
}

if(localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-btn-on")
    document.body.classList.remove("dark-theme")
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on")
    document.body.classList.add("dark-theme")
}else{
    localStorage.setItem("theme", "light");
}
// --------------------------------------------
// ///////////////////////////////////////:::::::

// -----Opening modal of Making new post---

const inputListen = document.querySelector('.post-input-container textarea')
const modal = document.getElementById('modal')
const closePost = document.querySelector('.close-new-post')
const postInput = document.querySelector('.n-post-body textarea')

inputListen.addEventListener('click',()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    modal.showModal()
    document.body.style.overflow="hidden";
} )

closePost.addEventListener('click',()=>{
    postInput.value = ""
    img_holder.style.display = 'none'
    modal.close()
    document.body.style.overflow="";
} )

// --------------------------------------------
// //////////////////////////////////////////:

// -------- Adding image from device to Session storage and to image holder------------
const HTMLfile = document.querySelector('#file')
const myLabel = document.querySelector('.holder_wrapper label')
const imgPostHolder = document.querySelector('.holder_wrapper img')
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

// --------------------------------------------
// //////////////////////////////////////////:

// -------- Making new post------------

const post_main_container = document.querySelector('.post-main-container')
const post_btn = document.querySelector('.n-post-body button')
const PostedImg = document.querySelector('.imgPosted')
const liky = document.querySelectorAll('.like_icon')

post_btn.addEventListener('click',makePost)

function makePost(){
    const newPostText = postInput.value
    const postContainer = document.createElement('div')
    postContainer.classList.add('post-container')
    
    // Get img form placeHolder
    const imgPostUrl = imgPostHolder.getAttribute('src')
    
    postContainer.innerHTML = `
    <div class="post-row">
        <div class="user-profile">
            <img src="images/profile-pic.png" alt="">
            <div>
                <p>John Nick</p>
                <span>June 24 2021, 13:40 pm</span>
            </div>
        </div>
        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
    </div>
                    
    <p class="post-text">${newPostText}</p>
    <img class="post-img" src="${imgPostUrl}" alt="">
    
    <div class="post-row">
        <div class="activity-icons">
            <div><img class="like_icon" src="images/like.png" alt=""><p>120</p></div>
            <div><img src="images/comments.png" alt="">45</div>
            <div><img src="images/share.png" alt="">20</div>
    
        </div>
        <div class="post-profile-icon">
            <img src="images/profile-pic.png" alt=""> <i class="fa-solid fa-caret-down"></i>
        </div>
    </div>
    `

    post_main_container.insertBefore(postContainer,post_main_container.children[0])
    // Like ability after post
    const likyP = document.querySelector('.like_icon')
    likyP.addEventListener('click',()=>{
        let likyPn = likyP.nextElementSibling
        let LikeNumP = parseInt(likyPn.innerHTML)
        let unDoLike = LikeNumP - 1
            console.log(unDoLike)
            let like = LikeNumP + 1
            console.log(like)
    
            if(likyP.getAttribute('src') == 'images/like-blue.png'){
                likyP.setAttribute('src','images/like.png')
                likyPn.innerHTML = unDoLike
            }else{
                likyP.setAttribute('src','images/like-blue.png')
                likyPn.innerHTML = like
            }

    })
    

    //-----------
    setTimeout(()=> {
        modal.close(),500
        postInput.value = ""
    })
    document.body.style.overflow="";
}
// -----------------------------------
//  ---------  Open Image Gallery holder---------
const new_post_content_cntr = document.querySelector('.new-post-content-wrapper')
const galery_btn = document.querySelector('.img-icon-g')
const img_holder = document.querySelector('.new-img-holder')

galery_btn.addEventListener('click', ()=>{
    img_holder.style.display = 'block'
    new_post_content_cntr.scrollTop = 90;

})


// --------------------------------------------
// //////////////////////////////////////////:

// -------- Like post------------

liky.forEach((span)=>{
    span.addEventListener('click',(event)=>{

        let likeNumH = event.target.nextElementSibling
        let LikeNumP = parseInt(likeNumH.innerHTML)
        let unDoLike = LikeNumP - 1
        console.log(unDoLike)
        let like = LikeNumP + 1
        console.log(like)

        if(event.target.getAttribute('src') == 'images/like-blue.png'){
            event.target.setAttribute('src','images/like.png')
            likeNumH.innerHTML = unDoLike
        }else{
            event.target.setAttribute('src','images/like-blue.png')
            likeNumH.innerHTML = like
        }
    })
})

// --------------------------------------------
// //////////////////////////////////////////:

// -------- Close Section------------

const btn_close_sec = document.querySelector('.cntr_conversation .sidebar-title p')
const body_conv = document.querySelector('.conv_body')

btn_close_sec.onclick = ()=>{
    body_conv.classList.toggle('conv_body_closed')
}
// --------------------------------------------
// //////////////////////////////////////////:

// -------- Seach Friends------------

const input_friend_search = document.querySelector('.sidebar-title div input')
const items = document.querySelectorAll('.conv_body .online-list p')
input_friend_search.addEventListener('input', filterItems)

function filterItems(){
    const inputV = input_friend_search.value.toLowerCase()

    items.forEach(item =>{
        const itemText = item.textContent.toLocaleLowerCase()
        if(itemText.includes(inputV)){
            item.parentElement.style.display = ''
            // item.parentElement.classList.add('')
        }else{ 
            item.parentElement.style.display = 'none'
            // item.parentElement.classList.add('online-list_hide')
        }
    })
}