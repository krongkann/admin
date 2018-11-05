
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

var createButton= (context,value, func) =>{
  var button = document.createElement("input");
  button.type = "button";
  button.value = value;
  button.id = value
  button.onclick = func;
  return context.appendChild(button);
}
var createInput= (context, value, func)=>{
  var input = document.createElement("input");
  input.type = "text";
  input.name = value;
  input.id = value
  input.onchange = func;
  return context.appendChild(input)
}
var createLabel = (context, value, func)=>{
  p = document.createElement("p");
  p.innerHTML = value
  return context.appendChild(p);
}
var createSelection = (context, value,k ,  func) =>{
  var myDiv = document.createElement("div");
  myDiv.setAttribute("id","myDiv")
  var selectList = document.createElement("select");
  selectList.setAttribute("id", k);
  myDiv.appendChild(selectList);
  _.map(value,(v,k)=>{
    var option = document.createElement("option")

    option.setAttribute("value", v);
    option.text = v;
    selectList.appendChild(option);

  })
  selectList.onclick = func
  
  context.appendChild(selectList);
  
}


var showContent=async (options, data) => { 
  const p = document.createElement('div');
  var table = new Tabulator("#ppp-table",options);
  var doc = document.body
  var elem = document.querySelector('#Redo');
  var undo = document.querySelector('#Undo');
  var headerFilter = document.querySelector('#headerSelect');
  var opeFilter = document.querySelector('#opeSelect');
  var vFilter = document.querySelector('#value');
  var vclearFilter = document.querySelector("#ClearFilter")
  switch (options.type) {
    case "interactionHistory":
      createButton(doc,"Redo",  function() {
        table.redo();

      });
      createButton(doc,"Undo", function() {
        table.undo();
      });
     
      if(headerFilter !== null){
        console.log("==err");

        headerFilter.parentNode.removeChild(headerFilter);
        opeFilter.parentNode.removeChild(opeFilter)
        vFilter.parentNode.removeChild(vFilter)
        vclearFilter.parentNode.removeChild(vclearFilter)
      }
      break;
    case "filterData":
      var field
      var type = "=" ;
      var key
      createSelection(doc,["name","location","progress", "gender", "rating", "dob", "car"],"headerSelect", function(value) {
        field  = this.value
        key = _.isEmpty(key)? "" : key
        table.setFilter(field, type , key);
        // table.setFilter(field,this.type, null )
      })
      createSelection(doc,["=","<","<=", ">", ">=", "!=", "like"],"opeSelect",  function(value) {
        type  = this.value
        
        table.setFilter(field, type , key);

      })
      createInput(doc, "value", function(value){
        key = this.value
        table.setFilter(field,type ,key)
      })
      createButton(doc,"ClearFilter", function(){
        var txtInput = document.getElementById("value")
        txtInput.value = ""
        var txtField = document.getElementById("headerSelect")
        txtField.value = ""
        table.clearFilter();
      } )
      if(elem !== null  ){
        elem.parentNode.removeChild(elem);
        undo.parentNode.removeChild(undo)
      }
      
      break;
      
      

        

    default:

      if(elem !== null  ){
        elem.parentNode.removeChild(elem);
        undo.parentNode.removeChild(undo)
      }
      if(headerFilter !== null){
        headerFilter.parentNode.removeChild(headerFilter);
        opeFilter.parentNode.removeChild(opeFilter)
        vFilter.parentNode.removeChild(vFilter)
        vclearFilter.parentNode.removeChild(vclearFilter)
      }
  }
  p.textContent = table.setData(data)

}  
var dateEditor = (cell, onRendered, success, cancel)=>{
  var cellValue = moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD"),
  input = document.createElement("input");

  input.setAttribute("type", "date");

  input.style.padding = "4px";
  input.style.width = "100%";
  input.style.boxSizing = "border-box";

  input.value = cellValue;

  onRendered(function(){
      input.focus();
      input.style.height = "100%";
  });

  function onChange(){
      if(input.value != cellValue){
          success(moment(input.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
      }else{
          cancel();
      }
  }

  //submit new value on blur or change
  input.addEventListener("change", onChange);
  input.addEventListener("blur", onChange);

  //submit new value on enter
  input.addEventListener("keydown", function(e){
      if(e.keyCode == 13){
          onChange();
      }

      if(e.keyCode == 27){
          cancel();
      }
  });

  return input;
};


var typeTable = (key)=>{
  switch(key){
    case 'columnGroup':{
      var options = {
        height:"311px",
        layout:"fitColumns",
        pagination:"local",
        type: "columnGroup",
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
        layout:"fitColumns",
        type: "frozenColumn",
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
    case 'columnCalculations':{
      var options = {
        height:"311px",
        type: "columnCalculations",
        movableColumns:true,
        layout:"fitColumns",
        columns:[
            {title:"Name", field:"name", width:200},
            {title:"Progress", field:"progress", width:100, sorter:"number", bottomCalc:"avg", bottomCalcParams:{precision:3}},
            {title:"Gender", field:"gender"},
            {title:"Rating", field:"rating", width:80, bottomCalc:"avg"},
            {title:"Favourite Color", field:"col"},
            {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
            {title:"Driver", field:"car", align:"center", formatter:"tickCross", topCalc:"count"},
        ],
      }
      return options
    }
    case 'editableData':{
      return {
        height:"311px",
        type: "editableData",
        columns:[ 
          {title:"Name", field:"name", width:150, editor:"input"},
          {title:"Location", field:"location", width:130, editor:true},
          {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress", width:140, editor:true},
          {title:"Gender", field:"gender", editor:"select", editorParams:{"male":"Male", "female":"Female"}},
          {title:"Rating", field:"rating",  formatter:"star", align:"center", width:100, editor:true},
          {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", editor:dateEditor},
          {title:"Driver", field:"car", align:"center", editor:true, formatter:"tickCross"},
      ],
      }
    }
    case 'validation':{
      var options ={
        height:"311px",
        type: "validation",
        layout:"fitColumns",
        columns:[
            {title:"Name", field:"name", width:150, editor:"input", validator:"required"},
            {title:"Progress", field:"progress", sorter:"number", align:"left", editor:"input", editor:true,  validator:["min:0", "max:100", "numeric"]},
            {title:"Gender", field:"gender", editor:"input", validator:["required", "in:male|female"]},
            {title:"Rating", field:"rating",  editor:"input", align:"center", width:100, editor:"input", validator:["min:0", "max:5", "integer"]},
            {title:"Favourite Color", field:"col", editor:"input", validator:["minLength:3", "maxLength:10", "string"]},
        ],
        validationFailed:function(cell, value, validators){
            //cell - cell component for the edited cell
            //value - the value that failed validation
            //validatiors - an array of validator objects that failed

            //take action on validation fail
        },
      }
      return options
    }
    case 'interactionHistory':{
      var options={
        type: "interactionHistory",
        height:"311px",
        layout:"fitColumns",
        history:true,
        columns:[
        {title:"Name", field:"name", width:200, editor:"input"},
        {title:"Progress", field:"progress", align:"right", editor:"input"},
        {title:"Gender", field:"gender", editor:"input"},
        {title:"Rating", field:"rating",  align:"center", width:100},
        {title:"Favourite Color", field:"col"},
        {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
        {title:"Driver", field:"car", align:"center", sorter:"boolean"},
        ],
      }
      return options
    }
    case 'filterData':{
      var options = {
        height:"311px",
        layout:"fitColumns",
        type: "filterData",
        columns:[
            {title:"Name", field:"name", width:200},
            {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
            {title:"Gender", field:"gender"},
            {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
            {title:"Favourite Color", field:"col"},
            {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
            {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
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