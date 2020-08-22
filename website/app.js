/* Global Variables */
const key = '53ab2019377dcd8259f3e7f3863802ce'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// click function to generate click button
document.getElementById('generate').addEventListener('click', submitData);

function submitData() {
    const country = document.getElementById('country').value;
    const zipCode = document.getElementById('zip').value;
    const userRes = document.getElementById('feelings').value;
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${country},${zipCode}&appid=${key}`;
    // const baseURL = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&appid=${key}`;

    // to get data from api using get method
    getWeather(baseURL).then((res) => {
        console.log(res);
        // to update data which coming from getWeather function
        postWeather('http://localhost:8000/UpdateData', 
        { tempreature: res.main.temp, date: newDate, userReasponse: userRes }).then((r) => {
            // to get data from server api 
            updateDta()
        })
    })
}


// get weather
const getWeather = async(baseURL, key, submitData) => {
    const res = await fetch(baseURL, key, submitData);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}


// post weather
const postWeather = async(url, data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    try {
        const editData = await res.json();
        return editData
    } catch (error) {
        console.log('error', error);
    }
}

// fetching data from server side and demonstrate them in DOM 
const updateDta = async() => {
    const data = await fetch('http://localhost:8000/getData')
    const updatedData = await data.json();
    console.log('get Data ', updatedData);
    const uiDate = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');

    // ui data
    const dateContent = document.createElement('p');
    dateContent.textContent = 'Date : ' + updatedData.date;
    uiDate.appendChild(dateContent);

    // temp data
    const tempContent = document.createElement('p');
    tempContent.textContent = 'Tempreature : ' + updatedData.tempreature;
    temp.appendChild(tempContent);

    // content data
    const contentData = document.createElement('p');
    contentData.textContent = 'Feeling : ' + updatedData.userReasponse;
    content.appendChild(contentData);
}