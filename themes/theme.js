const themeSwitch = document.querySelector('.theme-switch')
const themeSelectors = document.querySelectorAll('input[name=theme]')
const themeStylesheet = document.getElementById('theme-stylesheet')

console.log(themeStylesheet)
themeSelectors.forEach(radio => radio.addEventListener('change', e => handleThemeChange(e.target)))

const handleThemeChange = (target) => {
    console.log(target)
    themeStylesheet.setAttribute('href', `themes/${target.id}.css`)
}

// const initialTheme