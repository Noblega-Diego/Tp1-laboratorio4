const get = (id) => document.getElementById(id);
let bodyTable = get('bodyTable');
const url = "http://168.194.207.98:8081";
const tx_search = get('tx_search');
const generateRow = ({id, usuario, bloqueado, apellido, nombre}) => {
    return `
        <tr data-id="${id}" class="${((bloqueado === 'N')? 'unlock':'block')}">
            <td>${id}</td>
            <td>${usuario}</td>
            <td>${bloqueado.toUpperCase()}</td>
            <td>${apellido.toUpperCase()}</td>
            <td>${nombre.toUpperCase()}</td>
            <td><button data-btop="unlock" class='unlock'></button></td>
            <td><button data-btop="block" class='block'></button></td>
        </tr>`
}

const listUsersFindByName = (param)=>{
    fetch(url + '/tp/lista.php?action=BUSCAR&usuario=' + param)
        .then(res => res.json())
        .then(data => {
            bodyTable.innerHTML = '';
            data.forEach((user) => {
                bodyTable.innerHTML += generateRow(user);
            });
        }).catch(err => {})
}

const changeStateUser = (userId, bloqueado, fun)=>{
    fetch(url + `/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=${bloqueado}`)
        .then(res => {fun()}).catch(err => {})
}

const getRow = (bt)=>{return bt.parentElement.parentElement;}
const updateRow = (row, block, bt) =>{return ()=>{
        bt.disabled = false; 
        row.children[2].innerText = (block)? 'Y':'N';
        if(block) row.classList.replace('unlock','block');
        else row.classList.replace('block','unlock');
}}
get('search').addEventListener('submit', (e)=>{
    e.preventDefault();
    let search = tx_search.value;
    listUsersFindByName(search);
})

bodyTable.addEventListener('click',({target}) => {
    if(target.nodeName !== 'BUTTON') return;
    const op = target.dataset.btop;
    const row = getRow(target);
    const id = row.dataset.id;
    if(Number.isNaN(Number.parseInt(id))) return;
    target.disabled = true;
    if(op === 'block')
        changeStateUser(id, 'Y', updateRow(row, true, target))
    else if(op === 'unlock')
        changeStateUser(id, 'N', updateRow(row, false, target))
})

listUsersFindByName('');