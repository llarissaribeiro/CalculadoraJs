const main = document.querySelector('main')
const root = document.querySelector(':root') //variáveis do css
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

//primeiro impedir que o usuário consiga digitar no campo de input
//criar um array com todos os caracteres que serão permetidos

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//adicionar funcionalidade aos botões
//pega todo elementos com a classe charKey e para cada um deles executa um função, um forEach para um dos botões
document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
    charKeyBtn.addEventListener('click', function(){
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

//adicionar botão de limpar
document.getElementById('clear').addEventListener('click', function(){
    input.value = ''
    input.focus()
    //focus = seleciona automaticamente o input
})

input.addEventListener('keydown', function(ev){ //keydown = quando uma tecla é pressionada
    //previnir o comportamento padrão da função, quando o usuário apertar a tecla, ela não vai ser inserida automaticamente no input
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
        return
    //se a tecla pressionada estiver incluída no array de teclas válidas, acrescenta ela no valor do input
    }

    //adicionar a tecla de apagar
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0, -1)
    //slice corta o último caractere (0 = posição inicial, -1 = até o penúltimo(ou seja, só exlui um, se fosse -2, excluiria até o antepenúltimo, excluindo assim 2 caracteres))
    }

    //adicionar a tecla enter para calcular o resultado
    if(ev.key === 'Enter'){
        calculate()
    }
})

//adiconar função ao elemento =
document.getElementById('equal').addEventListener('click', calculate)

function calculate(){
    //toda vez que a função de calcular for chamada a primeira função que era vai escrever é ERRO
    resultInput.value = 'ERRO'
    resultInput.classList.add('error')
    //se tiver algum erro para no cáculo e exibe uma mensagem de erro
    const result = eval(input.value)
    //eval = avalia o código javascript e executa ele, deve ser utilizada com muito cuidado, pode ser perigosa porque o usuário consegue executar qualquer coisa, inclusive malwares
    resultInput.value = result
    //se não tiver erro nos caracteres inseridos vai executar o cálculo e retirar a classe de erro
    resultInput.classList.remove('error')
}


document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copiar') {
        button.innerText = 'Copiado!'
        button.classList.add("success")
        //copia o texto para área de transferência
        navigator.clipboard.writeText(resultInput.value)
    } else {
        //remove a cor de clicado do botão
        button.innerText = 'Copiar'
        button.classList.remove("success")
    }
})

//trocar o tema
document.getElementById('themeSwitcher').addEventListener('click', function(){
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#dbd8d8')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        root.style.setProperty('--calculator-color', '#dbd8d8')
        main.dataset.theme = 'light'
    } else{
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        root.style.setProperty('--calculator-color', '#aaa')
        main.dataset.theme = 'dark'
    }
})