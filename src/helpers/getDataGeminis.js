require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
//const genAI = new GoogleGenerativeAI('AIzaSyD4IDXFgnZ8YLQ3RYp10D1L3-TeMoIs7M0');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function splitByNumberDot(text) {
    // Usamos una expresión regular para dividir el texto en partes basadas en el patrón número.punto
    
    return text.split(/(?=\d\.\s)/);
}

function splitQuestionsAndAnswers(text) {
    const questionsArray = splitByNumberDot(text).filter(q => q.trim() !== "");
    
    const result = questionsArray.map(question => {
        const parts = question.split(/\(\w\)/);
        const questionText = parts[0].trim();
        const answers = parts.shift();
        
        return {
            question: questionText,
            answers: parts
        };
    });
    return result;
}


const dataGeminis=async(nivel,tema)=>{
    
    const prompt = `Hola oye me puedes generar un texto de 300 palabras sobre el tema ${tema}(si no sabes del tema inventas algo) y que este sea de nivel ${nivel} en ingles. Y que me generes 5 preguntas sobre el tema con una dificultad alta las cuales este relacionadas al nivel de ingles dicho y el tema y que me generes opcion multiples con opciones dificiles cada pregunta tenga 4 opciones de la forma (a)respuesta1 (b)respuesta2.Y que separes estos temas en 1-Texto, 2-Preguntas, 3-Respuestas.Que todo este en ingles es como una especie de prueba y que siempre las preguntas tengan opcion multiple no lo olvides y las respuestas sean de la forma a,b,c,c solo la letra sin el numero`;


    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const parts= text.split("**")

    const arr= parts.filter(e=> e.length>=15);
    const mat= arr.map(i=> i.replace(/\n/g, ""))

    if(mat.length==3){
        return mat;
    }else{
        dataGeminis(nivel,tema)
    }


    
}

function splitAnswers(answersText) {
    // Usamos una expresión regular para extraer las letras que siguen a los números
    const text = answersText.replace(/\s+/g, '');
    const lettersArray = [];
    // Recorremos cada carácter en la cadena de texto
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // Verificamos si el carácter es una letra
        if (/[a-zA-Z]/.test(char)) {
            lettersArray.push(char);
        }
    }
    return lettersArray;
}

const cleanData=(data)=>{
    const new_data={
        text:data[0],
        questions:splitQuestionsAndAnswers(data[1]),
        answers:splitAnswers(data[2])
    }

    return new_data;

}

module.exports={
    dataGeminis,
    cleanData
}