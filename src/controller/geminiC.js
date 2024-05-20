const{dataGeminis}= require('./../helpers/getDataGeminis');

const getData = (nivel,tema)=>{
    dataGeminis(nivel,tema)
}

module.exports={
    getData
}