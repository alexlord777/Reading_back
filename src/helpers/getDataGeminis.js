require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
//const genAI = new GoogleGenerativeAI('AIzaSyD4IDXFgnZ8YLQ3RYp10D1L3-TeMoIs7M0');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


const dataGeminis=async(nivel,tema)=>{
    
    console.log(process.env.API_KEY);
    const prompt = `Hola oye me puedes generar un texto de 300 palabras sobre el tema ${tema}(si no sabes del tema inventas algo) y que este sea de nivel ${nivel}. Y que me generes 5 preguntas sobre el tema con una dificultad alta las cuales este rlacionadas al nivel de ingles dicho y el tema y que me generes opcion multiples con opciones dificiles cada pregunta tenga 4 opciones.Y que separes estos temas en 1-Texto, 2-Preguntas, 3-Respuestas.Que todo este en ingles es como una especie de prueba y que siempre las preguntas tengan opcion multiple no lo olvides y las respuestas sean de la forma 1-a,2-b`;


    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const parts= text.split("**")

    const arr= parts.filter(e=> e.length>=15);
    const mat= arr.map(i=> i.replace(/\n/g, ""))


    console.log(mat);
}

module.exports={
    dataGeminis
}