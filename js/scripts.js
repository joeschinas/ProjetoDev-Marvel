
/*
 * caminho de validação com API, nesse trecho esta sendo usadas variaveis do
 * tipo generica, para estababelecer a validação.
 */
var url ="https://gateway.marvel.com:443/v1/public/characters";
var publicKey ="6a7db89d4d35c3945dd1e60054c6b4aa";
var privateKey ="65753b310faf973144226d355d042ee897f5b5b4";
var ts = new Date().getTime();
/*
 * nesse trecho abaixo esta sendo usado a variavel o hash,
 * que ele esta recebendo o resultado do algoritmo md5,
 * que esta concatenado com as variaveis declaras acimas, 
 * que carregam os valores de chaves de conexão com API.
 * fonte:https://developer.marvel.com/documentation/authorization
 */
var hash=md5(ts+privateKey+publicKey);
/*
 * nesse trecho de codigo abaixo, esta sendo criando uma variavel generica,
 * que esta concatenando todas as variaveis, usando o "&" para separalas.
 *  */
var urlCharacters = url+"?apikey="+publicKey+"&ts="+ts+"&hash="+hash;
/*
 * trecho de codigo abaixo esta sendo declara a variavel generica oReq, ela esta recendo o objeto,XMLHttpRequest
 * que irar pegar o caminho do url informado, e carregar.
 * a função "function" recebe o resultado da requisição.
 *
 */
var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET",urlCharacters);
    oReq.send();
 
/*
 * variavel obj esta recebendo a conversão da string result para um objeto, que vem da requisição de dados "JSON"
 */
function reqListener (){
    var result = this.response;
    
    var obj= JSON.parse(result);
    //alert(obj.data.results[0].name);
    
   
    for(i=0; i<=obj.data.results.length; i++){      
        var charItem = obj.data.results[i];
        
        var item = "";
            item+= "<article>";
            if(charItem.thumbnail){
            item+= "<img src='"+charItem.thumbnail.path+"."+charItem.thumbnail.extension+"'>"; 
            }
            item+= "<div>";
            item+= "<h1>"+charItem.name+"</h1>";
           
            item+= "<p> Marvel Cinematic Universe</p>";
            item+= "<br>";
            item+= "<p><b><a href='#'onclick='openModalSeries("+charItem.id+")'>Series</a></b></p>";
            item+= "<p><b><a href='#'>Stories</a></b></p>";
            item+= "<br>";
            item+= "</div>";
            item+= "</article>";
            
            document.getElementById("list").innerHTML+=item;
     } 
 }
 
function openModalSeries(id) {
    var urlCharactersSeries = url + "/" + id +"/series?apikey="+publicKey+"&ts="+ts+"&hash="+hash;
    
    var oReqSeries = new XMLHttpRequest();
        oReqSeries.addEventListener("load", reqListenerSeries);
        oReqSeries.open("GET",urlCharactersSeries);
        oReqSeries.send();
        
   function reqListenerSeries(){
        var result = this.response;
        var obj= JSON.parse(result);
        
        var item = "<h4>Series</h4>";
        
        for(i=0; i< obj.data.results.length; i++){
            var serie = obj.data.results[i];
            item+="<p>" + serie.title + "</p>";
        }
        
        document.getElementById("descricao").innerHTML=item;
        document.getElementById("characterSerie").style.display = "block";
   }
}
    
function closeModal() {
    document.getElementById("characterSerie").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("characterSerie")) {
        document.getElementById("characterSerie").style.display = "none";
    }
}
     
     



