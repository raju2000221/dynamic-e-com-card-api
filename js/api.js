const loadPhones = async  (searchText) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText} `
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    displayPhone(data.data)
}
const displayPhone = phones =>{
        const phoneContainer = document.getElementById('phone_container');
        phoneContainer.innerHTML ='';
        // show limited phone like 20 phone display on per page
        const showall =document.getElementById('showall')
        if(phones.length>15){
            phones = phones.slice(0,20);
            
            showall.classList.remove('d-none')
        }
        else{
            showall.classList.add('d-none')
        }
        
        // display No phone Found
        const noPhone = document.getElementById('no-phone')
        if(phones.length === 0){
            noPhone.classList.remove('d-none')
        }
        else{
            noPhone.classList.add('d-none')
        }
        /////////////////// 
        phones.forEach( phone => {
            const phoneDiv = document.createElement('div');
       
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
                <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text"> Brand: ${phone.brand}</p>
                <button onclick="loadPhonreDetails('${phone.slug}')"href ="" class ="btn btn-primary"> Details </button>
                </div>
                </div>
            `;
            phoneContainer.appendChild(phoneDiv);
        });
        // stop spinner
        toggleSpinner(false)
        
}
const searchText = text =>{
    // start loader
    toggleSpinner(true)
    const searchfield =document.getElementById('search-field').value
    loadPhones(searchfield)
}

document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
    const searchfield =document.getElementById('search-field').value
    loadPhones(searchfield)
    }
})
// loader // spinner

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
const loadPhonreDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

}

loadPhones('apple')