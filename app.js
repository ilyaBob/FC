console.log("консоль работает");

fetch("https://fontan.city/services/").then(response =>response.text()).then(html => {
        let parser = new DOMParser(); // Парсим полученынй документ из строки в HTML
        let docParse = parser.parseFromString(html, 'text/html');
        console.log(docParse);

        let services = docParse.querySelectorAll(".sect > a");
        let arrServ = Array.from(services).map(el => 'https://fontan.city/' + el.href.split("/").slice(el.href.split("/").indexOf("services")).join('/'));
        arrServ.map(el=>{
            fetch(el).then(response => response.text()).then(html => {
                let parser = new DOMParser(); // Парсим полученынй документ из строки в HTML
                let docParse = parser.parseFromString(html, 'text/html');

                let sc = docParse.querySelector('sc');
                console.log(sc);
            })
        })
        console.log(arrServ);
        })
        
       
        


        