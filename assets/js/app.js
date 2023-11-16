const root = document.getElementById("root");
const totalPersonajes = document.getElementById("total-personajes");
let pagina = 1;
let total = 0;

//Filtros
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");


//Paginado
const paginaActual = document.getElementById("pagina-actual");
const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const firstPage = document.getElementById("first-page");
const lastPage = document.getElementById("last-page");

const getData = async ()=>{
    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    const response = await fetch(URL);
    //console.log(response);
    const json = await response.json();
    //console.log(json);

    total = json.info.pages;
    /*1-Setear en que pagina estoy Listo*/
    /*2-Hacer una funcion que renderice las cards Listo*/
    /*3-Tenemos que actualizar el paginado Listo*/

    paginaActual.innerHTML = pagina;
    totalPaginas.innerHTML = total;



    printData(json.results);

    //console.log(total);
    //console.log(json);
    //console.log(json.results);
    //console.log(json.results[0].name);

    updatePagination();


    data = json;
    //console.log(data, "<--Data");
    return json;
};
getData(pagina);

let data= {};

const printData = (arr)=>{  
    //console.log(arr);
    let card = "";
    totalPersonajes.innerHTML = arr.length;
    //console.log(totalPersonajes);
    arr.forEach((personaje => {
        //console.log(personaje);

        card = card + 
        `
            <div class="card">
                <div class="card-image">
                    <img src=${personaje.image} alt="">
                </div>
                <div class="card-content">
                    <p><span class="detail-bold">Nombre: </span>${personaje.name}</p>
                    <p><span class="detail-bold">Genero: </span>${personaje.gender==="Female"?"Mujer":""||personaje.gender==="Male"?"Hombre":""||personaje.gender==="Genderless"?"Sin Genero":""||personaje.gender==="unknown"?"No se sabe":""}</p>
                    <p><span class="detail-bold">Especie: </span>${personaje.species}</p>
                    <p><span class="detail-bold">Estado: </span>${personaje.status==="Alive"?"Vivo":""||personaje.status==="Dead"?"Muerto":""||personaje.status==="unknown"?"No se sabe":""}</p>
                    <p><span class="detail-bold">Origen: </span>${personaje.origin.name}</p>
                    <p><span class="detail-bold">Locacion: </span>${personaje.location.name}</p>
                </div>
                <div class="card-link">
                    <a href="https://rickandmortyapi.com/api/character/${personaje.id}" target="_blank">VER MAS...</a>
                </div>
            </div>      
        `;
    }));
    root.innerHTML = card;
};


const updatePagination = ()=>{
    if(pagina<=1){
        prevPage.disabled = true;
        firstPage.disabled = true;
    }else{
        prevPage.disabled = false;
        firstPage.disabled = false;
    }


    if(pagina===total){
        nextPage.disabled = true;
        lastPage.disabled = true;
    }else{
        nextPage.disabled = false;
        lastPage.disabled = false;
    }
};

//Paginacion
const pagination = async(prom)=>{
    const result = await prom;

    nextPage.addEventListener("click",()=>{
        pagina+=1;
        getData();
    });

    prevPage.addEventListener("click",()=>{
        pagina-=1;
        getData();
    });

    firstPage.addEventListener("click",()=>{
        if(pagina>1){
            pagina=1
            getData();
        };
    });

    lastPage.addEventListener("click",()=>{
        if(pagina<result.info.pages){
            pagina=result.info.pages;
            getData();
        };
    });

};

//Filtros
mujeres.addEventListener("click",()=>{
    const arr = data.results;
    const arrMujeres = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].gender==="Female"){
            arrMujeres.push(arr[i]);
        }
    }
    printData(arrMujeres);
});


hombres.addEventListener("click",()=>{
    const arr = data.results;
    const arrHombres = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].gender==="Male"){
            arrHombres.push(arr[i]);
        }
    }
    printData(arrHombres);
});


sinGenero.addEventListener("click",()=>{
    const arr = data.results;
    const arrSinGenero = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].gender==="Genderless"){
            arrSinGenero.push(arr[i]);
        }
    }
    printData(arrSinGenero);
});


noSeSabe.addEventListener("click",()=>{
    const arr = data.results;
    const arrNoSeSabe = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].gender==="unknown"){
            arrNoSeSabe.push(arr[i]);
        }
    }
    printData(arrNoSeSabe);
});

todos.addEventListener("click",()=>{
    const arr = data.results;
    printData(arr);
})


pagination(getData());