const get = (id) => document.getElementById(id);
const form = get("fm_login");
const tx_user = get("tx_user");
const tx_password = get("tx_password");
const url = "http://168.194.207.98:8081";

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let user = tx_user.value.trim().toLowerCase();
    let password = tx_password.value;
    fetch(url + `/tp/login.php?user=${user}&pass=${password}`)
    .then(res => res.json())
    .then(data => {
        if(data.respuesta === 'ERROR') 
            throw data.mje
        window.location.href = 'lista.html'
    })
    .catch(err => {
        alert(err)
    })
})