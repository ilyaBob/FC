let headerBtn = document.querySelector('.header__btn');
let findResult = document.querySelector('.table');
let infoBox = document.querySelector('.main__info-box');
let count = 0;

const objToCheck = [
   { url: "https://fontan.city/services/", classBox: '.sect > a' },
   { url: "https://fontan.city/tipovye-resheniya/", classBox: '.sect > a' },
   { url: "https://fontan.city/advice/", classBox: '.inner-item > .title > a' },
]

headerBtn.addEventListener('click', startChecking)

// Получение страниц
function startChecking(){
   infoBox.style.display = 'none';
   findResult.innerHTML = '<thead class="thead"><th class="th">№</th><th class="th">Название</th><th class="th">Ссылка</th></thead>';

   for (const item of objToCheck) {
      if (item.url == "https://fontan.city/advice/") {
   
         fetch(item.url)
            .then(response => response.text())
            .then(html => {
               let parser = new DOMParser();
               let docParse = parser.parseFromString(html, 'text/html')
               let countPages = docParse.querySelectorAll('.pagination > li > a');
               return countPages[countPages.length - 2].textContent;
            })
            .then(countPages => {
               console.log(countPages);
               for (let i = 1; i <= countPages; i++) {
                  parse(`https://fontan.city/advice/?PAGEN_1=${i}`, '.inner-item > .title > a')
               }
            })
      }
      else {
         parse(item.url, item.classBox)
      }
   }
}

function parse(url, classBoxUrlOnPage) {
   fetch(url)
      .then(response => response.text())
      .then(html => {
         let parser = new DOMParser();
         let docParse = parser.parseFromString(html, 'text/html');

         let parseUrl = docParse.querySelectorAll(classBoxUrlOnPage);
         for (const item of parseUrl) {
            const contentUrl = `https://fontan.city${item.getAttribute('href')}`
            fetch(contentUrl)
               .then(response => response.text())
               .then(html => {
                  let parserUrl = new DOMParser();
                  let docParseUrl = parserUrl.parseFromString(html, 'text/html');

                  let erScript = docParseUrl.querySelector('sc');
                  if (erScript) {
                     let title = docParseUrl.querySelector('h1').textContent;
                     count++;
                     findResult.innerHTML += `<tr class="tr">
                                                <td class="td td__number">${count}</td>
                                                <td class="td">${title}</td>
                                                <td class="td"> <a target="_blank" href="${contentUrl}">${contentUrl}</a></td>
                                             </tr>`;
                  } else {
                     console.log("Поломка не найдена: " + contentUrl);
                  }
               })
         }
      })
}