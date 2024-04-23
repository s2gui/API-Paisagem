document.addEventListener('DOMContentLoaded', function () {
    //Captura elementos do formulário e da lista de paisagens
    const paisagemForm = document.getElementById('paisagem-form');
    const paisagemList = document.getElementById('paisagem-list');
    const paisagemEdit = document.getElementById('paisagem-editar');
    const paisagemDele = document.getElementById('paisagem-deletar');
    const deletarButton = document.querySelector('.deletar');
    let paisagemArray = []; //Array para armazenar as paisagens

    //Event listener para o formulário de deletar
    paisagemDele.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('id-deletar').value);
        deletePaisagem(id) 
    })

    //Função para Listar Paisagem (CRUD)
    function listarPaisagem() {
        fetch('http://localhost:3000/paisagem')
            .then(response => response.json())
            .then(data => {
                paisagemList.innerHTML = ''; 
                paisagemArray = data; 
                data.forEach(paisagem => {
                    const li = document.createElement('li');
                    const createImg = document.createElement('img');
                    createImg.src = paisagem.link;
                    createImg.style.width = '350px';
                    createImg.style.height = '390px';
                    createImg.addEventListener('click', () => exibirModalPaisagem(paisagem));
                    li.appendChild(createImg);
                    paisagemList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro:', error));
    }

    //Função para Adicionar Paisagem 
    paisagemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let id = paisagemArray.length + 1;
        const nome = document.getElementById('nome').value;
        const lugar = document.getElementById('lugar').value;
        const tipo = document.getElementById('tipo').value;
        const link = document.getElementById('link').value;

        fetch('http://localhost:3000/paisagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, nome: nome, lugar: lugar, tipo: tipo, link: link }),
            
        })
            .then(response => response.json())
            .then(() => {
                listarPaisagem(); 
                paisagemForm.reset(); 
                console.log("Ola")

            })
            .catch(error => console.error('Error:', error));
            
    });

    listarPaisagem();

    //Função para detectar se a lista de imagens chegou ao final
    const imagensDiv = document.querySelector('.imagens');
    imagensDiv.addEventListener('scroll', function () {
        if (imagensDiv.scrollLeft + imagensDiv.clientWidth >= imagensDiv.scrollWidth) {
            paisagemList.classList.add('end');
        } else {
            paisagemList.classList.remove('end');
        }
    });
});

//Função para abrir modal de Adicionar Paisagem
function abrirModalAdd() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal') {
            modal.classList.remove('abrir');
        }
    });
}

//Função para abrir modal de Editar Paisagem
function abrirModalEditar() {
    const modal = document.getElementById('janela-modal-editar');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-editar') {
            modal.classList.remove('abrir');
        }
    });
}

//Função para abrir modal de Deletar Paisagem
function abrirModalDeletar() {
    const modal = document.getElementById('janela-modal-deletar');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-deletar') {
            modal.classList.remove('abrir');
        }
    });
}

//Função para abrir modal de Exibir Paisagem
function abrirModalExibir() {
    const modal = document.getElementById('janela-modal-exibir');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-exibir') {
            modal.classList.remove('abrir');
        }
    });
}

//Função para abrir modal de Adicionar Paisagem
function ajustarPaisagem() {
    const imagensWidth = paisagemList.scrollWidth;
    const containerWidth = imagensDiv.clientWidth;

    if (imagensWidth > containerWidth) {
        paisagemList.classList.add('multiple-lines');
    } else {
        paisagemList.classList.remove('multiple-lines');
    }
}

//Função para exibir Detalhes da Paisagem 
function exibirModalPaisagem(paisagem) {
    const modalContent = document.querySelector('.modal-exibir');
    modalContent.innerHTML = `
    <button class="fechar" id="fechar">X</button>
        <p>Id: ${paisagem.id}</p>
        <p>Nome: ${paisagem.nome}</p>
        <p>Lugar: ${paisagem.lugar}</p>
        <p>Tipo: ${paisagem.tipo}</p>
    `;
    const modal = document.getElementById('janela-modal-exibir');
    modal.classList.add('abrir');
}

//Função para Deletar Paisagem
function deletePaisagem(id) {
    fetch(`http://localhost:3000/paisagem/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(() => {
            listarPaisagem(); //Atualiza a lista após Deletar
            const modal = document.getElementById('janela-modal-deletar');
        })
        .catch(error => console.error('Error:', error));
}




