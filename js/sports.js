// ** load data of scoocer

const loadData = async ()=>{
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/latestsoccer.php`);
        response.ok ? console.log('Successfull') : console.log('Unscuccessful');
        const data = await response.json();
        displayMathDetails(data)
    } catch (error) {
        console.log(error);
    }
}

loadData()


const displayMathDetails = (data)=>{
    const {teams:{Match}} = data;

    Match.forEach(match => {
        const {AwayGoals,Date,HomeGoals,HomeTeam,HomeTeam_Id,League,Location} = match;
    })
}