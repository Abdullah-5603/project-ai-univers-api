// fetch data function
let dataArray = [];
let dataLimit = 6;
const loadData = async () =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools/'
    const res = await fetch(url);
    const data = await res.json();
    dataArray = data.data.tools;
    showData();
}

// show data function
const showData = () =>{
    const card = document.getElementById('card');
    const seeMoreBtn = document.getElementById('see-more-btn');
    card.innerHTML = '';
    let dataToShow = dataArray.slice(0, dataLimit);
    dataToShow.forEach(singleData => {
        const singleDataDiv = document.createElement('div');
        singleDataDiv.classList.add('col');
        singleDataDiv.innerHTML = `
        <div class="card">
            <img src=${singleData.image} class="card-img-top" style="height:200px;" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${singleData.features[0]}</li>
                    <li>${singleData.features[1]}</li>
                    <li>${singleData.features[2]}</li>
                </ol>
            </div>
                <hr>
            <div class="d-flex" style="flex-direction:column; width: 100%;">
                <h5 class="mx-3">${singleData.name}</h5>
                <div class="d-flex mx-3 justify-content-between" style="flex-direction:row;">
                <div class="d-flex style="flex-direction:row;">
                <i class="bi bi-calendar-week"></i>
                <p class="mx-2">${singleData.published_in}</p>
                </div>
                <div class="">
                <i class="bi bi-arrow-right text-danger p-3" onclick="loadDataDetails('${singleData.id}')" data-bs-toggle="modal" data-bs-target="#dataDetails"></i>
                </div>
                </div>
            </div>
        </div>
        `
        card.appendChild(singleDataDiv);
    });
    // show/hide see-more-btn
    if(dataLimit >= dataArray.length){
        seeMoreBtn.classList.add('d-none');
    }else{
        seeMoreBtn.classList.remove('d-none');
    }
    // spinner function called
    toggleSpinner(false);
}

toggleSpinner(true);

const sortByDate = document.getElementById('sort-btn');
sortByDate.addEventListener('click', function(){
    dataArray.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    dataLimit = 6;
    showData();
});

const seeMoreBtn = document.getElementById('see-more-btn');
seeMoreBtn.addEventListener('click', function(){
    dataLimit = dataArray.length;
    showData();
});


// toggleSpinner function
function toggleSpinner(isLoading){
    const spinnerSection = document.getElementById('loader');
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}
const loadDataDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDataDetails(data)
}
const showDataDetails = data =>{
    // const dataName = document.getElementById('dataDetailsName');
    const aiFullDetails = document.getElementById('Ai-full-details');
    const aiImageDetails = document.getElementById('Ai-image-details')
    // aiFullDetails.innerText = data.data.name;
    const {features} = data.data;
    const a = Object.values(features)[0].feature_name;
    const b = Object.values(features)[1].feature_name;
    const c = Object.values(features)[2].feature_name;
    aiFullDetails.innerHTML = `
    <p class="fw-bold">${data.data.description}</p>
    <div class="d-flex justify-content-between" style="flex-direction: row;">
    <div class="text-success">${data.data.pricing && data.data.pricing[0].price ? data.data.pricing[0].price: 'no data'}</div>
    <div class="text-warning">${data.data.pricing && data.data.pricing[1].price ? data.data.pricing[1].price: 'no data'}</div>
    <div class="text-danger">${data.data.pricing && data.data.pricing[2].price ? data.data.pricing[2].price: 'no data'}</div>
    </div>
    <div class="d-flex justify-content-between" style="flex-direction: row;">
    <div>
    <p class="fw-bold mt-3">Fetaurs:</p>
    <ul>
        <li>${a}</li>
        <li>${b}</li>
        <li>${c}</li>
    </ul>
    </div>
    <div>
    <p class="fw-bold mt-3">Integrations:</p>
    <ul>
        <li>${data.data.integrations && data.data.integrations[0] ? data.data.integrations[0]: "No data"}</li>
        <li>${data.data.integrations && data.data.integrations[1] ? data.data.integrations[1]: "No data"}</li>
        <li>${data.data.integrations && data.data.integrations[2] ? data.data.integrations[2]: "No data"}</li>
    </ul>
    </div>
    </div>
    `
    aiImageDetails.innerHTML = `
    <div class="image-container">
        <img src="${data.data.image_link[0]}" style="height:200px;" alt="">
        ${
            data.data.accuracy.score ?
            `<div id="img-overlay" class="overlay">${data.data.accuracy.score * 100}% accuracy</div>` :
            ''
          }
      
    </div>
    <p class="text-center py-2 fw-bold">${data.data.input_output_examples && data.data.input_output_examples[0].input ? data.data.input_output_examples[0].input: 'No data'}</p>
    <p class="text-center px-2">${data.data.input_output_examples && data.data.input_output_examples[0].output ? data.data.input_output_examples[0].output: 'no data'}</p>

    `;
    // console.log(data.data)
}

