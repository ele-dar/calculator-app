const themeSelectors = Array.from(document.querySelectorAll('input[name=theme]'))
const themeStylesheet = document.getElementById('theme-stylesheet')

const setColorScheme = (scheme) => {
    themeStylesheet.setAttribute('href', `themes/${scheme}.css`)
    themeSelectors.find(selector => selector.id === scheme).checked = true
}

const getPreferredColorScheme = () => {
    if (sessionStorage.getItem('preferred-color-scheme')) return sessionStorage.getItem('preferred-color-scheme')
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    }
    return 'dark'
}

setColorScheme(getPreferredColorScheme())

if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)')
    colorSchemeQuery.addEventListener('change', () => {
        setColorScheme(getPreferredColorScheme())
    })
}

themeSelectors.forEach(radio => radio.addEventListener('change', e => {
    setColorScheme(e.target.id)
    sessionStorage.setItem('preferred-color-scheme', e.target.id)
})
)