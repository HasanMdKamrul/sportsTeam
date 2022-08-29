// ** load data of scoocer



const loadData = async (search)=>{
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/searchevents.php?e=${search}`);
        response.ok ? console.log('Successfull') : console.log('Unscuccessful');
        const data = await response.json();
        displayEventDetails(data)
    } catch (error) {
        console.log(error);
    }
}




const displayEventDetails = (data)=>{
    console.log(data)
    const events = document.getElementById('eventDetails');
    events.textContent = '';
    const {event} = data;
    event.forEach(eventSingle => {
        const {strEvent,strTime,idHomeTeam,strHomeTeam} = eventSingle;
        let {strThumb,dateEventLocal} = eventSingle;
        strThumb !== '' && strThumb !== null ? strThumb : strThumb = 'https://www.thesportsdb.com/images/media/event/thumb/p3uy2m1659642411.jpg';
        dateEventLocal !== null ? dateEventLocal : dateEventLocal = "Date not fixed yet"
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='detailInfoLoad(${idHomeTeam})'>
      <img src="${strThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${strEvent}</h5>
        <p class="card-text"> <small class="text-info">Match Time:${strTime}</small> </p>
        <p class="card-text"> <small class="text-danger">Match Date: ${dateEventLocal}</small> </p>
      </div>
        `;

        events.appendChild(div)
    })
};

const detailInfoLoad = async (id,team) =>{
   
    console.log(typeof id)
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupequipment.php?id=${id}`);
        response.ok ? console.log('Successfull') : console.log('Unscuccessful');
        const data = await response.json();
        sessionDisplay(data)
    } catch (error) {
        console.log(error);
    }
}

const sessionDisplay = (data)=>{
    const {equipment} = data;

    const detailSection = document.getElementById('details');

    detailSection.textContent = '';
    
    equipment.forEach(item => {
        console.log(item)
        const {strEquipment,strSeason,strType,strUsername} = item;


        detailSection.innerHTML = `
        <div class="card mb-3 w-100">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${strEquipment}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${strUsername}</h5>
                <p class="card-text">
                 Jerssy No: ${strType}
                </p>
                <p class="card-text">
                  <small class="text-muted">Session: ${strSeason}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        `
    })
    
}


document.getElementById('button-addon2').addEventListener('click',()=>{
    const searchInput = document.getElementById('search-input').value
    console.log(searchInput)
    loadData(searchInput);
});

loadData('Arsenal_vs_Chelsea')