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

// log out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log('user signed out')
    });
});