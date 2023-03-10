const axios = require('axios');

const getData = (req, res) => {
    const API_KEY = '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'
    const prompt = req.params.text;

    const data = {
        model: "text-davinci-003",
        prompt: `Summarize this into 3 bullet points to be added to my resume:\n\n${prompt}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }

    axios.post('https://api.openai.com/v1/completions', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        }
    })
        .then((response) => {
            console.log(response.data)
            res.send({
                message: "Data fetched succefully from openAI api",
                data: response.data.choices[0].text.split("\n").slice(2)
            })
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

module.exports = {
    getData
}