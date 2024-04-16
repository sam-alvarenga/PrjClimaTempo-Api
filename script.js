document.querySelector('.busca').addEventListener('submit', async (event) => {



    //impede a ação padrão dp for,mulário que será recarregar a página
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    //!==: for diferente que vazio
    if (input !== '') {

        showWarning('Carregando...')

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=717e1e8904aa83b734bcaba2e4a1c512`);

        let json = await results.json();



        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo()
            showWarning('Cidade não encontrada')
        }

        /*  console.log(json);  */
    }else {
        clearInfo()
    }

})

function showInfo(json) {
    //retirando a mensagem da tela antes de exibir os resultados
    showWarning('');

    //alterando o display do elemento .aviso para que ele seja exibido na tela  
    document.querySelector(".resultado").style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`)
}

function showWarning(msg) {
    // innerHTML: ele escrever algo no HTML
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'nome';
}
