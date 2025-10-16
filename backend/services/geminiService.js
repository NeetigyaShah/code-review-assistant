const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;
function getClient() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY');
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

async function generateReview({ sourceCode, language, filename }) {
  if (!process.env.GEMINI_API_KEY || process.env.MOCK_AI === 'true') {
    return {
      overallScore: 85,
      summary: 'Static mock review summary for local testing.',
      categories: { readability:{score:8,notes:'Good naming'}, modularity:{score:7,notes:'Could split large functions'}, performance:{score:8,notes:'No obvious bottlenecks'}, security:{score:7,notes:'Input validation limited'}, bestPractices:{score:8,notes:'Generally solid'} },
      issues: [ { category:'readability', severity:'low', title:'Line length', description:'A line exceeds recommended length', lineStart:1, lineEnd:1, codeSnippet: sourceCode.split('\n')[0], suggestion:'Wrap the line', impact:'Minor' } ],
      positives: ['Clear structure','Consistent style'],
      metrics: { complexity:5, maintainabilityIndex:72, linesOfCode: sourceCode.split('\n').length, estimatedBugs:0.1, duplicationPercent:0 }
    };
  }
  const client = getClient();
  const model = client.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL || 'gemini-pro',
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    }
  });
  
  const prompt = `You are an advanced code review engine. Return ONLY valid JSON (no markdown, no code blocks).
Analyze the following ${language} file named ${filename}.

${sourceCode}

Return JSON with this exact structure:
{
  "overallScore": <number 0-100>,
  "summary": "<brief summary>",
  "categories": {
    "readability": {"score": <0-10>, "notes": "<text>"},
    "modularity": {"score": <0-10>, "notes": "<text>"},
    "performance": {"score": <0-10>, "notes": "<text>"},
    "security": {"score": <0-10>, "notes": "<text>"},
    "bestPractices": {"score": <0-10>, "notes": "<text>"}
  },
  "issues": [
    {
      "category": "<category>",
      "severity": "low|medium|high",
      "title": "<title>",
      "description": "<description>",
      "lineStart": <number>,
      "lineEnd": <number>,
      "codeSnippet": "<code>",
      "suggestion": "<suggestion>",
      "impact": "<impact>"
    }
  ],
  "positives": ["<positive1>", "<positive2>"],
  "metrics": {
    "complexity": <number>,
    "maintainabilityIndex": <number>,
    "linesOfCode": <number>,
    "estimatedBugs": <number>,
    "duplicationPercent": <number>
  }
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Try to extract JSON from various formats
  let jsonText = text;
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  } else {
    // Try to find JSON object directly
    const objMatch = text.match(/\{[\s\S]*\}/);
    if (objMatch) {
      jsonText = objMatch[0];
    }
  }
  
  return JSON.parse(jsonText.trim());
}

module.exports = { generateReview };
