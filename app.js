let service = document.querySelector(".servis");
console.log("консоль работает");

document.querySelector('button').onclick = function(){

    let list_url = [
        {url:"https://fontan.city/services/",chapter:"services", class:"sect"},
        {url:"https://fontan.city/tipovye-resheniya/",chapter:"tipovye-resheniya", class:"sect"},
        {url:"https://fontan.city/advice/?PAGEN_1=1",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=2",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=3",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=4",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=5",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=6",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=7",chapter:"advice", class:"inner-item  > .title"},
        {url:"https://fontan.city/advice/?PAGEN_1=8",chapter:"advice", class:"inner-item  > .title"},
    ]

let count = 0;
let progress = 0;
let progerssStat = 0;
let vallArr = 0;
service.innerHTML = "";


    // Перебераем массив ссылок
    list_url.map(elementList => fetch(elementList.url).then(response =>response.text()).then(html => {
            let parser = new DOMParser();                                       // Парсим полученынй документ из строки в HTML
            let docParse = parser.parseFromString(html, 'text/html');

            let services = docParse.querySelectorAll(`.${elementList.class} > a`);

            let arrServ = Array.from(services).map(el => 'https://fontan.city/' + el.href.split("/").slice(el.href.split("/").indexOf(elementList.chapter)).join('/'));

            vallArr += arrServ.length;
            
            
            // Проверка испранвости скрипта на страничке
            arrServ.map(el=>{

                fetch(el).then(response => response.text()).then(html => {
                    let parser = new DOMParser();
                    let docParse = parser.parseFromString(html, 'text/html');

                    let sc = docParse.querySelector('sc');
                    if(sc) {
                        let h1Services = docParse.querySelector('#pagetitle');
                        service.innerHTML += `${++count}) <a href=${el}><span id = "url_name">${h1Services.textContent}</span></a></br>`;
                        console.log(sc);
                    }
                    progerssStat ++;
                    progress += 100 / vallArr;
                    document.querySelector(".progressBar").style.width = `${progress}%`;
                    document.querySelector(".progressStatus").innerHTML = `${progerssStat}/ ${vallArr}`;
                 
                })
            })
        })
        
    ) 

}