const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setTheme(theme);
}
 
getTheme();


const setTheme = theme => document.documentElement.className = theme;
 
document.getElementById('theme-select').addEventListener('change', function() {
  setTheme(this.value);
  localStorage.setItem('theme', theme);
});

