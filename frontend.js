const getData = async (latest=null) => {
    let url = 'http://localhost:4000/runs';
    if (latest) {
        url = 'http://localhost:4000/runs/latest';
    }
    try {
        const response = await fetch(url);
        // console.log(response.status);
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
}

// const getData = (route, id=null) => {
//     let url = route;
//     if (id) {
//         url += `/${id}`;
//     }
//     return fetch(url).then(res => res.json());
// }

const updateData = async (event) => {
    event.preventDefault();
    const date = document.querySelector('#date').value;
    const duration = document.querySelector('#duration').value;
    const distance = document.querySelector('#distance').value;
    // console.log("Data: ", date, duration, distance);

    const url = 'http://localhost:4000/runs';
    const headers = {
        "Content-Type": "application/json"
    };
    const data = {
        "date": date,
        "duration": duration * 60,
        "distance": distance * 1000
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });
        // console.log(response);
        const json = await response.json();
        loadDataTable();
        return json;
    } catch (error) {
        console.log(error);
    }
};

const deleteRun = async (event) => {
    let url = 'http://localhost:4000/runs';
    url += `/${event.target.dataset.id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        const ok = response.ok;
        loadDataTable();
        if (ok) return;
    } catch (error) {
        console.log(error);
    }
};

const loadDataTable = () => {
    removeDataTable();
    const dataTable = document.querySelector('.data');
    // set parameter to true to retrieve latest 5 runs in 
    // reverse chron order
    const runs = getData(true);
    runs.then(objects => {
        objects.map(object => {
        // console.log(object);
        const run = document.createElement('tr');
        const runDate = document.createElement('td');
        const runDur = document.createElement('td');
        const runDist = document.createElement('td');
        const runDel = document.createElement('td');
        const runDelBtn = document.createElement('button');
        runDelBtn.classList.add('delete-run');
        runDelBtn.setAttribute("data-id", object.id);
        runDelBtn.innerHTML = "X";
        runDelBtn.addEventListener('click', deleteRun);
        runDel.appendChild(runDelBtn);
        // runDate.innerHTML = object.date.split('T')[0];
        runDate.innerHTML = formatDate(object.date);
        runDur.innerHTML = object.duration / 60 + ' mins';
        runDist.innerHTML = object.distance / 1000 + ' Km';
        run.appendChild(runDate);
        run.appendChild(runDur);
        run.appendChild(runDist);
        run.appendChild(runDel);
        dataTable.appendChild(run);
        });
    });
};

const removeDataTable = () => {
    const dataTable = document.querySelector('.data');
    while (dataTable.hasChildNodes()) {
        dataTable.removeChild(dataTable.firstChild);
    }
}

const formatDate = (datetime) => {
    const dateString = datetime.split('T')[0];
    const dateArray = dateString.split('-');
    const year = dateArray[0];
    const month = dateArray[1] - 1;
    const day = dateArray[2];
    const date = new Date(year, month, day);
    return date.toDateString(dateString);
}