let input = document.getElementById('input');
let add = document.getElementsByClassName('add');
let main = document.getElementById('lista');
let cont = 0 ;
let tarefas = [];

window.onload = function () {
    carregarTarefas();
    renderizarTarefas();
};

function adicionarTarefa() {
   // Pegar o valor do input primeiro
    let valorInput = input.value.trim();

    // Verificar se tem algo dentro do input

    if ((valorInput != "") && (valorInput != null) && (valorInput != undefined)) {
        cont += 1
        let novoItem = `<div class="item" id="${cont}">
            <div class="icon" onclick="marcarTarefa(${cont})">
                <i id="icone_${cont}" class='bx  bx-circle'  ></i> 
            </div>

            <div class="nome" onclick="marcarTarefa(${cont})">
                ${valorInput}
            </div>

            <div class="botao" onclick="deletar(${cont})">
                <button class="del"> <i class='bx  bx-trash'>Deletar</i> </button>
            </div>
        </div>`

        let novaTarefa = {
            id: cont,
            texto: valorInput,
            feito: false
         };
        

        // Comando para adicionar o item
        main.innerHTML += novoItem

        tarefas.push(novaTarefa);
        salvarTarefas();
        renderizarTarefas();

        // Comando para zerar o item
        input.value = "";
        // focus() deixa o campo focado, no caso o input
        input.focus();
    }

}

function deletar(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    // Salva e renderiza novamente

    salvarTarefas();
    renderizarTarefas();
}

function marcarTarefa(id) {
    var item = document.getElementById(id);
    var classe = item.getAttribute('class');
    console.log(classe);

    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.feito = !tarefa.feito; // alterna entre true e false
        salvarTarefas();
        renderizarTarefas();
    }

    if (classe == "item") {
        item.classList.add('feito');

        var icone = document.getElementById("icone_"+id);
        icone.classList.remove("bx-circle");
        icone.classList.add("bxs-check-circle");
    }

    else {
        item.classList.remove('feito');
        var icone = document.getElementById("icone_"+id);
        icone.classList.remove("bxs-check-circle");
        icone.classList.add("bx-circle");
    }

    salvarTarefas();
    renderizarTarefas();
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        cont = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) : 0;
    }
}

function renderizarTarefas() {
    main.innerHTML = "";
    tarefas.forEach(tarefa => {
        main.innerHTML += `
            <div class="item ${tarefa.feito ? 'feito' : ''}" id="${tarefa.id}">
                <div class="icon" onclick="marcarTarefa(${tarefa.id})">
                    <i id="icone_${tarefa.id}" class='bx ${tarefa.feito ? 'bxs-check-circle' : 'bx-circle'}'></i>
                </div>
                <div class="nome" onclick="marcarTarefa(${tarefa.id})">
                    ${tarefa.texto}
                </div>
                <div class="botao" onclick="deletar(${tarefa.id})">
                    <button class="del"><i class='bx bx-trash'></i> Deletar</button>
                </div>
            </div>
        `;
    });
}

input.addEventListener("keyup", function(event){
    if(event.key == "Enter") {
        event.preventDefault();
        adicionarTarefa();
    }
})


