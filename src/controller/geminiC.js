const{dataGeminis,cleanData}= require('./../helpers/getDataGeminis');

const getData = async(nivel,tema)=>{
    const data=await dataGeminis(nivel,tema);
    const res=cleanData(data)
    return res;
}

module.exports={
    getData
}