// api

let content = document.getElementById("api-container");
  function fetchDataApi(){
    fetch('https://dog.ceo/api/breeds/image/random/3')
      .then(data => data.json())
      .then(data =>{
          content.innerHTML +=
            `<div class="dog-card">
            <img src = "${data.message[0]}"</img>
            </div>
            <div class="dog-card">
            <img src = "${data.message[1]}"</img>
            </div>
            <div class="dog-card">
            <img src = "${data.message[2]}"</img>
            </div>`
      })
  }
  fetchDataApi();
  fetchDataApi();
