// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

const options = [];
function fill_options(option, num){
  for(let i = 0; i<num; i++){
    options.push(option);
  }
}
function choose(max){
  return Math.floor(Math.random()*max);
}
fill_options(0,3);
fill_options(1,5);
fill_options(2,5);
fill_options(3,10);
function make_dirty(states){ 
  //Ensusia los estados. La distribución es:
  //13% ensucia ambos
  //22% ensucia left
  //22% ensucia right
  //43% no ensucia ninguno

  let decision = options[choose(options.length)];
  switch(decision){
    case 0: { //Ensuciamos ambos
      states [1] = "DIRTY";
      states [2] = "DIRTY";
      return states;
    }
    case 1:{ //Ensusiamos left
      states [1] = "DIRTY";
      return states;
    }
    case 2:{ //Ensusiamos right
      states [2] = "DIRTY";
      return states;
    }
    default: return states; //No ensuciamos ninguno.
  }
}
function test_completeness(estados){
  if(Object.keys(estados).length!=8) return false; //Nisiquiera se han descubierto
  //los 8 estados.
  for(k in estados){
    if (estados[k] < 2) return false;
  }
  return true;
}
let estados = {};
function test(states){
        let location = states[0];
        let estado = location +"|"+ states[1] +"|"+ states[2];
        
        if(!(estado in estados))estados[estado] = 1;
        else estados[estado] = estados[estado] + 1;

        let graph = "<br>"+estado + " => "+ estados[estado] + " visitas";
        
      	let state = location == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
      	document.getElementById("log").innerHTML+= graph;
      	if (action_result == "CLEAN"){
        	if (location == "A") states[1] = "CLEAN";
         	else if (location == "B") states[2] = "CLEAN";
      	}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";		
        if(test_completeness(estados)){
          alert("Todos los estados han sido visitados 2 veces o más! Resumen: ");
          for(const key in estados){
            alert("El estado: "+key+"; Fué visitado: "+ estados[key] +" veces");
          }
          return true;
        }
        states = make_dirty(states);
        setTimeout(function(){ test(states); }, 2000);
}

var states = ["A","DIRTY","DIRTY"];
test(states);
