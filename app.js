
// public and private routes

window.addEventListener("load", () => {
    const logout = document.getElementById("logout")
    const createblog = document.getElementsByClassName("formcnt")
 
     if (!localStorage.getItem("uid")) {
    logout.style.display = "none";
    createblog[0].style.display = "none";
     }else{
         login.style.display = "none"
     }
   });
   window.addEventListener("load", () => {
     console.log(localStorage.getItem("uid"));
     if (!localStorage.getItem("uid")) {
       window.location.replace("./pages/login.html");
     }
   
   });
 
 
 
   // Main Javascript
 
 import {
     getDownloadURL,
     ref,
     storage,
     uploadBytesResumable,
     doc,
     setDoc,
     db,
     addDoc,
     collection,
     getDocs,
     getDoc,
     deleteDoc,
     updateDoc,
     createUserWithEmailAndPassword
   } from "./js/firebase.js";
   
   window.addEventListener("load", async () => {
     const uid = localStorage.getItem("uid");
   
     const snapShots = await getDocs(collection(db, "blogs"));
     const tempArr = [];
     snapShots.forEach((doc) => {
       if (doc.data().isPrivate) {
      
         if (doc.data().uid == uid) {
           const obj = {
             ...doc.data(),
             id: doc.id,
           };
           tempArr.push(obj);
         }
       } else {
         const obj = {
           ...doc.data(),
           id: doc.id,
         };
         tempArr.push(obj);
       }
     });
     console.log("tempArr", tempArr);
   
     renderBlogUI(tempArr);
   });
   
   const title = document.getElementById("title");
   const content = document.getElementById("content");
   const image = document.getElementById("image");
   const uid = localStorage.getItem("uid");
   const createblog = document.getElementById("createblog");
   const parent = document.getElementById("parent");
   const flexSwitchCheckChecked = document.getElementById(
     "flexSwitchCheckChecked"
   );
   
 
  const handleSubmit = async () => {
    console.log("Title ", title.value);
    console.log("Image", image.files[0]);
    const imageUrl = await uploadImage(image.files[0]);
    const blogObj = {
      title: title.value,
      content: content.value,
      imageUrl: imageUrl,
      uid: uid,
      isPrivate: flexSwitchCheckChecked.checked,
    };

    await addDoc(collection(db, "blogs"), blogObj);

    renderBlogUI()
    alert("Blog Added on Dashboard");

}
const renderBlogUI = (tempArr) => {
  parent.innerHTML = ''; // Clear existing content
  for (const value of tempArr) {
    parent.innerHTML += ` <div class="col-lg-4 col-md-6 col-sm-12 my-2">
             <div class="card">
               <h5 class="card-header">
                 <img
                   src="${value.imageUrl}"
                   width="100%"
                   height="200px"
                   alt=""
                 />
               </h5>
               <div class="card-body">
                 <h5 class="card-title"> ${value.title} </h5>
                 <p class="card-text">
                 ${value.content}
                 </p>
               <button onclick="deleteblog('${value.id}')"  style="
                 background-color:  black;
                 border: 2px solid white;
                 color: white;
                 padding: 5px 10px;
                 margin-right: 10px;
                 cursor: pointer;
                 border-radius : 8px;
                 transition: background-color 0.3s, color 0.3s, border-color 0.3s;"
                  onmouseover="this.style.backgroundColor='white'; this.style.color='black'; this.style.borderColor='black';this.style.fontWeight='bold';"
               onmouseout="this.style.backgroundColor='black'; this.style.color='white'; this.style.borderColor='white';"
               >
               Delete Post</button>
                <button onclick="editblog(this)"
                 data-blog-id="${value.id}"
                 style="
                 background-color: black;
                 border: 2px solid white;
                 color: white;
                 padding: 5px 10px;
                 margin-right: 10px;
                 cursor: pointer;
                  border-radius : 8px;
               "
               onmouseover="this.style.backgroundColor='white'; this.style.color='black'; this.style.borderColor='black';this.style.fontWeight='bold';"
               onmouseout="this.style.backgroundColor='black'; this.style.color='white'; this.style.borderColor='white';">
               Edit Post</button>
               </div>
             </div>
           </div>`;
  }
};

// crud

// deleteblog
const deleteblog = async (blogId) => {
  await deleteDoc(doc(db, "blogs", blogId));
  alert("Blog deleted successfully");
  // Optionally, update the UI
  renderBlogUI(await fetchAllBlogs());
};
 




 
 
   const uploadImage = (file) => {
     return new Promise((resolve, reject) => {
       const metadata = {
         contentType: "image/jpeg",
       };
   
       // Upload file and metadata to the object 'images/mountains.jpg'
       const storageRef = ref(storage, "images/" + file.name);
       const uploadTask = uploadBytesResumable(storageRef, file, metadata);
   
       // Listen for state changes, errors, and completion of the upload.
       uploadTask.on(
         "state_changed",
         (snapshot) => {
           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log("Upload is " + progress + "% done");
           switch (snapshot.state) {
             case "paused":
               console.log("Upload is paused");
               break;
             case "running":
               console.log("Upload is running");
               break;
           }
         },
         (error) => {
  
           reject(error);
         },
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             console.log("File available at", downloadURL);
             resolve(downloadURL);
           });
         }
       );
     });
   };
 
   // logout
    const logoutHandler = () => {
        localStorage.removeItem("users");
        localStorage.clear();
        window.location.href = "./index.html";
 
 
      };
 
 
  //  Create blog js
      function CreateBlog() {
       const form = document.getElementById('form');
       if (form.classList.contains('d-none')) {
           form.classList.remove('d-none');
       } else {
           form.classList.add('d-none');
       }
     }
 
  // profile js
     function toggleProfilePanel() {
       const profilePanel = document.getElementById('profilePanel');
       profilePanel.classList.toggle('open');
   }
   window.addEventListener("load", async () => {
   const userID = localStorage.getItem("uid");
   const response = await getDoc(doc(db, "users", userID));
   const name = document.querySelector("#name");
   const email = document.querySelector("#email");
   name.innerHTML = `Name : ${response.data().fullName}`;
   email.innerHTML = `Email : ${response.data().email}`;
 
 });


 window.deleteblog = deleteblog;
 window.handleSubmit = handleSubmit;
 window.logoutHandler = logoutHandler;
 window.CreateBlog = CreateBlog;
 window.toggleProfilePanel = toggleProfilePanel;
 
 