const form = document.getElementById('formulario') || document.getElementById('formulario-login')
const input_nombre = document.getElementById('input-nombre')
const input_correo = document.getElementById('input-correo')
const input_password = document.getElementById('input-password')
const input_repetir_password = document.getElementById('input-repetir-password')
const mensaje_error = document.getElementById('mensaje-error')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let errores = []

    if(input_nombre) {
        errores = ErroresRegistro(input_nombre.value, input_correo.value, input_password.value, input_repetir_password.value)
    }
    else {
        errores = ErroresLogin(input_correo.value, input_password.value)
    }

    if(errores.length > 0) {
        mensaje_error.innerText = errores.join(". ")
    } else {
        if (input_nombre) {
            const usuario = {
                nombre: input_nombre.value,
                correo: input_correo.value,
                password: input_password.value
            }
        
            localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario))
            localStorage.setItem('usuarioLogged', JSON.stringify({nombre: usuario.nombre, correo: usuario.correo}))
            window.location.href = 'index.html'
        } else {
            const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'))

            if (usuarioGuardado && input_correo.value === usuarioGuardado.correo && input_password.value === usuarioGuardado.password) {
                localStorage.setItem('usuarioLogged', JSON.stringify({nombre: usuarioGuardado.nombre, correo: usuarioGuardado.correo}))
                window.location.href = 'index.html'
            } else {
                mensaje_error.innerText = 'Correo o contraseña incorrectos'
            }
        }
    }
})

function ErroresRegistro(nombre, correo, password, repetirPassword) {
    let errores = []

    if(nombre === '' || nombre == null) {
        errores.push('El nombre es obligatorio')
        input_nombre.parentElement.classList.add('incorrecto')
    }
    if(correo === '' || correo == null) {
        errores.push('El correo es obligatorio')
        input_correo.parentElement.classList.add('incorrecto')
    }
    if(password === '' || password == null) {
        errores.push('La contraseña es obligatoria')
        input_password.parentElement.classList.add('incorrecto')
    }
    if(password.length < 8) {
        errores.push('La contraseña debe tener al menos 8 caracteres')
        input_password.parentElement.classList.add('incorrecto')
    }
    if(password !== repetirPassword) {
        errores.push('Las contraseñas no coinciden')
        input_password.parentElement.classList.add('incorrecto')
        input_repetir_password.parentElement.classList.add('incorrecto')
    }

    return errores
}

function ErroresLogin(correo, password) {
    let errores = []

    if(correo === '' || correo == null) {
        errores.push('El correo es obligatorio')
        input_correo.parentElement.classList.add('incorrecto')
    }
    if(password === '' || password == null) {
        errores.push('La contraseña es obligatoria')
        input_password.parentElement.classList.add('incorrecto')
    }

    return errores
}

const entradas = [input_nombre, input_correo, input_password, input_repetir_password].filter(input => input != null)

entradas.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrecto')) {
            input.parentElement.classList.remove('incorrecto')
            mensaje_error.innerText = ''
        }
    })
})