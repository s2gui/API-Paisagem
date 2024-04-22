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
        deletePaisagem(id) // Função para deletar a paisagem
    })

    //Função para Listar Paisagem (CRUD)
    function listarPaisagem() {
        // Realiza uma requisição fetch para obter os dados das paisagens do Banco de Dados
        fetch('http://localhost:3000/paisagem')
            .then(response => response.json())
            .then(data => {
                paisagemList.innerHTML = ''; //Limpa a lista Antes 
                paisagemArray = data; //Atualiza o array de Paisagens
                data.forEach(paisagem => {
                    // Cria um elemento <li> para cada paisagem
                    const li = document.createElement('li');
                    const createImg = document.createElement('img');
                    createImg.src = paisagem.link;
                    createImg.style.width = '350px';
                    createImg.style.height = '390px';
                    createImg.addEventListener('click', () => exibirModalPaisagem(paisagem));
                    li.appendChild(createImg);

                    /*
                                 // Adiciona botões "Editar" e "Excluir" embaixo da imagem
                                 const editButton = document.createElement('button');
                                 editButton.textContent = 'Editar';
                                 editButton.addEventListener('click', () => abrirModalEditar());
                                 li.appendChild(editButton);
                 
                                 const deleteButton = document.createElement('button');
                                 deleteButton.textContent = 'Deletar';
                                 deleteButton.addEventListener('click', () => abrirModalDeletar());
                                 li.appendChild(deleteButton);
                 */

                    paisagemList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro:', error));
    }

    //Função para Adicionar Paisagem 
    paisagemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //Captura os valores do formulário
        let id = paisagemArray.length + 1;
        const nome = document.getElementById('nome').value;
        const lugar = document.getElementById('lugar').value;
        const tipo = document.getElementById('tipo').value;
        const link = document.getElementById('link').value;

        //Faz uma requisição POST para adicionar a nova paisagem
        fetch('http://localhost:3000/paisagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, nome: nome, lugar: lugar, tipo: tipo, link: link }),
        })
            .then(response => response.json())
            .then(() => {
                listarPaisagem(); //Atualiza a lista após Adicionar uma Nova Paisagem
                paisagemForm.reset(); //Reseta o formulário

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

    //Event listener para fechar o modal quando o usuário clica fora dele ou no botão de fechar
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

    //Event listener para fechar o modal quando o usuário clica fora dele ou no botão de fechar
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

    //Event listener para fechar o modal quando o usuário clica fora dele ou no botão de fechar
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

    //Event listener para fechar o modal quando o usuário clica fora dele ou no botão de fechar
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

    //Adiciona a classe 'multiple-lines' se a lista de imagens tiver mais de uma linha
    if (imagensWidth > containerWidth) {
        paisagemList.classList.add('multiple-lines');
    } else {
        paisagemList.classList.remove('multiple-lines');
    }
}

//Função para exibir Detalhes da Paisagem 
function exibirModalPaisagem(paisagem) {
    // Seleciona o elemento que contém o conteúdo do modal
    const modalContent = document.querySelector('.modal-exibir');
    // Atualiza o conteúdo do modal com os detalhes da paisagem1
    modalContent.innerHTML = `
    <button class='fechar' id='janela-modal-exibir'>X</button>
        <p>Id: ${paisagem.id}</p>
        <p>Nome: ${paisagem.nome}</p>
        <p>Lugar: ${paisagem.lugar}</p>
        <p>Tipo: ${paisagem.tipo}</p>
    `;
    // Obtém o modal que será aberto
    const modal = document.getElementById('janela-modal-exibir');
    // Adiciona a classe 'abrir' ao modal para torná-lo visível
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




