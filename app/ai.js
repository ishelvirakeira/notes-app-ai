const express = require("express");
const router = express.Router();
const OpenAI = require("openai").OpenAI;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /ai/rewrite
router.post("/rewrite", async (req, res) => {
  try {
    const { text, tone } = req.body;

    if (!text || !tone) {
      return res.status(400).json({ error: "Missing text or tone." });
    }

    const prompt = `Rewrite the following text in a ${tone} tone. Keep the meaning. Improve clarity:\n\n${text}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful writing assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    res.json({ rewritten: completion.choices[0].message.content });

  } catch (error) {
    console.error("AI Rewrite Error:", error);
    res.status(500).json({ error: "AI rewrite failed." });
  }
});

router.post("/summary", async(req, res)=>{
    try{
        const{text} = req.body;

        if(!text){
            return res.status(400).json({error: "Missing text."});
        }
        const prompt = `Summarize the note in 3-5 bullet points, keeping the main ideas clear and simple:\n\n${text}`;
        const completion = await client.chat.completions.create({
            model:"gpt-4o-mini",
            messages:[
                { role: "system", content: "You are an expert summarization assistant." },
                { role: "user", content: prompt }
            ],
            max_tokens: 120,//maximum length of the AI's response
            temperature: 0.3
        });

        const summary=completion.choices[0].message.content;

        res.json({summary});

    }
    catch(error){
        console.error("Summary Error:", error);
        res.status(500).json({error:"AI summary Failed."})
    }
                
});

module.exports = router;
