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
    // get data
    db.collection('forumposts').get().then(snapshot => {
      setupPosts(snapshot.docs);
    });
  } else {
    setupPosts([]);
  }
})

// log out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

const postList = document.querySelector('.forumposts');
const setupPosts = (data) => {
  
  if (data.length) {
  
  let html = '';

  data.forEach(doc => {
    const post = doc.data();
    console.log(post)
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
    postList.innerHTML = '<p>You have been successfully logged out. You may navigate to another page, or you can sign in again using the <a href="myaccount.html">My Account</a> page.</p>'
  }
}