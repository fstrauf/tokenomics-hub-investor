import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const title = req.body.title || ''
  const scope = req.body.scope || ''
  if (title.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid title',
      },
    })
    return
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: generatePrompt(title, scope) }],
    })
    res.status(200).json({ result: completion.data.choices[0].message.content })
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

function generatePrompt(title, scope) {
  const capitalizedTitle = title[0].toUpperCase() + title.slice(1).toLowerCase()
  let prompt = ''
  switch (scope) {
    case 'shortDescription':
      prompt = `create a short summary of the ${capitalizedTitle} project and its token. max 400 characters.
        - n`
      break
    case 'problemSolution':
      prompt = `Generate a problem and solution statements for ${capitalizedTitle}, describing the problems ${capitalizedTitle} solves. Limit entire output, including spaces, to MAXIMUM 500 characters, strict limit

        use this format 
        Problem:
        - 
        
        Solution:
        - n`
      break
    case 'valueCreation':
      prompt = `Generate a paragraph explaining what value ${capitalizedTitle} creates, Start with "The value created by protocol name..."

        max 500 characters`
      break
    case 'businessModel':
      prompt = `take this business model information about a protocol, ${capitalizedTitle}. Create a bullet point list explaining where revenue comes from, what revenue is denominated in and where does revenue go. Include any relevant percentages.

      use this format:
      
      The business model for protocol
      - Revenue comes from:
      explanation
      
      - Revenue is denominated in:
      explanation
      
      - Revenue goes to:
      explanation

        max 500 characters`
      break
    case 'valueCapture':
      prompt = `I want you to create a Value Capture statement. There are 2 ways in which a protocol can capture the value it creates, the first is value accrual to the token, this involves supply and demand mechanisms that allow the token to map the value created via the supply and demand dynamic. second there is value accrued to the protocol treasury. 
        What is the Value Capture for ${capitalizedTitle}
        
        Use this format 
        Value accrual to token (if any)
        [briefly explain any mechanism that allow token to map the value created]
        
        Value accrual to token (if any)
        explanation
        
        Value accrual to protocol (if any)
        explanation
        
        max 500 characters`
      break
    case 'tokenUtility':
      prompt = `create a bullet point list with the utility of the ${capitalizedTitle} token, give a short explanation per point,

      use this format 
      $Token
      - point 1 name: explanation
      max 500 characters`
      break
    case 'demandDrivers':
      prompt = `I want you to create a Token Demand Drivers statement. In a token demand drivers statement you need to explain who is going to be buying and/or holding the token a why. 

      What is the Demand Drivers for ${capitalizedTitle}
      
      
      Use this format:
      name for demand driver:
      Who and explanation of demand driver
      
      name for demand driver:
      Who and explanation of demand driver
      
      MAXIMUM 500 characters`
      break
  }
  // console.log('🚀 ~ file: gptGenerate.js:85 ~ generatePrompt ~ prompt:', prompt)
  return prompt
}
