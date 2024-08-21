let salidaTexto = document.getElementById('contenedor_secundario');
let entradaUsuario = document.getElementById('entrada');
let text = document.getElementById('text');



//<button onclick="copiar()" id="boton_copiar" class="contenedor_secundario_boton_copiar botones">Copiar</button> 
const nuevoBoton = document.createElement('button');
nuevoBoton.classList.add('botones');
nuevoBoton.classList.add('contenedor_secundario_boton_copiar')
nuevoBoton.textContent = 'Copiar';
nuevoBoton.id = 'botonCopiar';
let botonCopiar = document.getElementById('botonCopiar');
nuevoBoton.onclick =  async function() {
    try {
        await navigator.clipboard.writeText(document.getElementById('texto').textContent);
        alert('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        alert('No se pudo copiar el texto');
    }
}

const textoInsertado = document.createElement('p');
textoInsertado.id = 'texto';
textoInsertado.classList.add('texto');


function formatoTexto(texto){
    texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g,'');    
    return texto.replace(/[^a-zA-Z0-9 ]/g,'');
}

function encriptar(){
    if(entradaUsuario.value!== ''){
        let textoAencriptar = formatoTexto(entradaUsuario.value);
        let nuevoTexto = textoAencriptar.replace(/[aeiou]/gi,(match) =>{
            switch(match){  
                case 'a':
                    return 'ai';
                case 'e':
                    return 'enter';
                case 'i':
                    return 'imes';
                case 'o':
                    return 'ober'
                case 'u':
                    return 'ufat'
                default:
                    return match;
            }
        });
        limpiar();
        salidaTexto.classList.remove('contenedor_salida');
        salidaTexto.classList.add('cuadros_texto_salida');
        textoInsertado.textContent = nuevoTexto;

        salidaTexto.appendChild(textoInsertado);
        salidaTexto.appendChild(nuevoBoton);
    }    
}

function desencriptar(){
    if(entradaUsuario.value!== ''){
        let texto = formatoTexto(entradaUsuario.value);
        let nuevoTexto = texto.replace(/ai|enter|imes|ober|ufat/gi,(match) =>{
            switch (match){
                case 'ai':
                    return 'a';
                case 'enter':
                    return 'e';
                case 'imes':
                    return 'i';
                case 'ober':
                    return 'o';
                case 'ufat':
                    return 'u';
                default:
                    return match;
            }
        });
        limpiar();
        salidaTexto.classList.remove('contenedor_salida');
        salidaTexto.classList.add('cuadros_texto_salida');
        textoInsertado.textContent = nuevoTexto;

        salidaTexto.appendChild(textoInsertado);
        salidaTexto.appendChild(nuevoBoton);  
    }
}

function limpiar(){
    salidaTexto.innerHTML = "";
    entradaUsuario.value = "";
}

function borrarImagen(){
    let imagenMuñeco = document.getElementById('imagenMuñeco');
    if(window.innerWidth < 769 && imagenMuñeco){
        imagenMuñeco.remove();
    }
}

window.addEventListener('DOMContentLoaded',borrarImagen);
window.addEventListener('resize', borrarImagen);

