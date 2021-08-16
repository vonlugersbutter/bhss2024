const setTheme = theme => {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

const getTheme = () => {
  let theme = localStorage.getItem('theme');
  if(theme) setTheme(theme);
}

document.addEventListener('DOMContentLoaded', e => {
  getTheme();
  
  document.getElementById('theme-select').addEventListener('change', e => {
    setTheme(e.target.value);
  });
});

//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    const useremail = user.email;
    if (useremail.endsWith("@mcmaster.ca") == true) {
      //the email is ok, proceed
      // get data
      db.collection('forumposts').onSnapshot(snapshot => {
        setupPosts(snapshot.docs);
        setupUI(user);
      });
    } else {
      // the email is not ok, delete account and send in error message
      setupUI();
      setupPosts([]);
      alert("Access denied. You have tried to sign in with a non-McMaster email account, so your account will be automatically deleted.")
      user.delete().then(() => {
        console.log("User deleted.")
      }).catch(err => {
        console.log(err.message)
      });
    }
  } else {
    setupUI();
    setupPosts([]);
    console.log("No user signed in")
  }
});

// log out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    auth.signOut();
    e.preventDefault();
    console.log("user has signed out")
});

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    const html = `
    <p>Logged in as ${user.displayName}, with ${user.email}.</p>
    `;
    accountDetails.innerHTML = html;
    //toggle ui elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //hide account info
    accountDetails.innerHTML ='';

    //toggle ui elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//create new post

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = firebase.auth().currentUser;

  db.collection('forumposts').add({
    Body: createForm['body'].value,
    Name: user.displayName
  }).then(() => {
    //reset the form
    createForm.reset();
  }).catch(err => {
    console.log(err.message)
  })
});

const postList = document.querySelector('.forumposts');

const setupPosts = (data) => {
  
  if (data.length) {
  
  let html = '';

  data.forEach(doc => {
    const post = doc.data();
    const li = `
        <div class="post"
        <p><b>${post.Name}</b></p>
        <p>${post.Body}</p>
        </div>
    `;
    html += li
  });

  postList.innerHTML = html;
  } else {
    postList.innerHTML = '<p>You have been successfully logged out. You may navigate to another page, or you can sign in again below.</p>'
  }
}