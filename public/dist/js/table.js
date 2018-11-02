
var getData =async () =>{
  var request = new XMLHttpRequest();

  return  new   Promise( (resolve, reject)=>{
    request.open('GET', 'http://127.0.0.1:5500/data', true);
    request.onload = function (response) {
    if (request.status >= 200 && request.status < 400) {
      resolve(JSON.parse(this.response));
    } else {
      reject("error");
    }
    }
    request.send();
  })

}

var showContent=async (options, data) => {  
  const p = document.createElement('div');
  var table = new Tabulator("#ppp-table",options);
  p.textContent = table.setData(data)
}  

var typeTable = (key)=>{
  switch(key){
    case 'columnGroup':{
      var options = {
        height:"311px",
        layout:"fitColumns",
        pagination:"local",
        langs:{
            "fr-fr":{ //French language definition
                "columns":{
                    "name":"Nom",
                    "progress":"Progression",
                    "gender":"Genre",
                    "rating":"Évaluation",
                    "col":"Couleur",
                    "dob":"Date de Naissance",
                    "car":"Voiture",
                },
                "pagination":{
                    "first":"Premier",
                    "first_title":"Premier Page",
                    "last":"Dernier",
                    "last_title":"Dernier Page",
                    "prev":"Précédent",
                    "prev_title":"Précédent Page",
                    "next":"Prochain",
                    "next_title":"Prochain Page",
                },
            },
            "de-de":{ //German language definition
                "columns":{
                    "name":"Name",
                    "progress":"Fortschritt",
                    "gender":"Genre",
                    "rating":"Geschlecht",
                    "col":"Farbe",
                    "dob":"Geburtsdatum",
                    "car":"Auto",
                },
                "pagination":{
                    "first":"Zuerst",
                    "first_title":"Zuerst Seite",
                    "last":"Last",
                    "last_title":"Letzte Seite",
                    "prev":"Zurück",
                    "prev_title":"Zurück Seite",
                    "next":"Nächster",
                    "next_title":"Nächster Seite",
                },
            },
        },
        columns:[
          {title:"Name", field:"name", width:200},
          {title:"Progress", field:"progress", width:100, sorter:"number"},
          {title:"Gender", field:"gender"},
          {title:"Rating", field:"rating", width:80},
          {title:"Favourite Color", field:"col"},
          {title:"Date Of Birth", field:"dob"},
          {title:"Driver", field:"car"} ]
      }

      return options
      
    }
    case 'frozenColumn':{
      var options =  {
        height:"311px",
        columns:[
        {title:"Name", field:"name", width:250, frozen:true}, //frozen column
        {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress", width:200,  editable:true},
        {title:"Gender", field:"gender", width:150},
        {title:"Rating", field:"rating",  formatter:"star", align:"center", width:200},
        {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
        {title:"Driver", field:"car", align:"center", formatter:"tickCross", width:150},
        ],
      }
      return options
    }
  }




}

var selectTable =async (k) =>{
  const select = document.getElementById("mySelect").value;
  const title = document.getElementById("title")
  title.textContent = select
  var options =  typeTable(select)
  var data = await  getData()
  await showContent(options , data)
  
}