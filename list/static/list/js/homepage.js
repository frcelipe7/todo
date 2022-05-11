// functions

// efeito scroll
function scrollToSection(event) {
    event.preventDefault();
    const id = event.target.getAttribute('href');
    const distaceFromTheTop = document.getElementById(id).offsetTop;

    window.scroll({
        top: distaceFromTheTop - 100,
        behavior: 'smooth'
    });
};

// input function 1
function adicionar(numero, inputHomepage) {
    let atividade = "Atividade";
    inputHomepage.value = atividade.slice(0, numero+1);
}

// input function 2
function preencherInput(inputHomepage, buttonHomepage, li, list) {
    let numero = 0;
   
    buttonHomepage.disabled = true;
    buttonHomepage.addEventListener('click', () => {
        li.innerHTML = inputHomepage.value;
        list.append(li);
        inputHomepage.value = "";
        buttonHomepage.disabled = true;
        changeNameList();
    })
    const interval = setInterval(() => {
        adicionar(numero, inputHomepage);
        numero++;
        if (numero == 9) {
            buttonHomepage.disabled = false;
            clearInterval(interval);
        }
    }, 200);
};

// list change name
function changeNameList() {
    const listName = document.querySelector('#funcionamento .list_view .list h3 span');
    let names = ["Doing", "Done"]
    let position = 0

    const interval = setInterval(() => {
        listName.innerHTML = names[position];
        position++;
        if (position >= 2) {
            clearInterval(interval);
        }
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    // links que estão menu
    const menu_links = document.querySelectorAll('.top .logo_and_links .link_navegacao .top_link');
    const logo = document.querySelector('.top .logo_and_links .logo');

    // contents
    const content_sobre = document.querySelector('.page2 .content_sobre');
    const content_gif = document.querySelector('.page2 .content_2 .content_gif img');

    menu_links.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    logo.addEventListener('click', () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            content_sobre.style.opacity = 1;
        };
        if (window.scrollY > 800) {
            content_gif.style.marginLeft = 0;
        };
    });

    const funcionamentoContent = document.querySelector('#funcionamento');
    const inputHomepage = document.querySelector('#funcionamento .list_view input');
    const buttonHomepage = document.querySelector('#funcionamento .list_view button');
    const list = document.querySelector('#funcionamento .list_view .list ul');
    var li = document.createElement('li');
    var ativado = false;
    document.addEventListener('scroll', () => {
        if (funcionamentoContent.getBoundingClientRect().top <= 150) {
            if (ativado == false) {
                preencherInput(inputHomepage, buttonHomepage, li, list);
            } 
            ativado = true;
        };
    });
});
