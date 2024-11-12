const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY; // Make sure your API key is stored securely

// Function to send the query to LLM for refinement
const processQueryWithLLM = async (userQuery) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                model: 'gpt-4o-mini', // Using gpt-4o-mini model
                messages: [
                    { role: 'system', content: 'You are a college enquiry chatbot.' },
                    { role: 'user', content: userQuery }
                ],
                max_tokens: 50,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error in processQueryWithLLM:', error);
        throw error;
    }
};

// Function to extract intent and keywords from the LLM's response
const extractIntentAndKeywords = (llmResponse) => {
    const queryLower = llmResponse.toLowerCase();

    let intent;
    if (queryLower.includes('courses') || queryLower.includes('majors')) {
        intent = 'get_courses';
    } else if (queryLower.includes('location') || queryLower.includes('address')) {
        intent = 'get_location';
    } else if (queryLower.includes('faculty') || queryLower.includes('professor')) {
        intent = 'get_faculty_info';
    } else if (queryLower.includes('admission') || queryLower.includes('apply')) {
        intent = 'get_admission_info';
    } else {
        intent = 'general_info';
    }

    // Extract keywords by splitting the response
    const keywords = llmResponse
        .split(' ')
        .map(word => word.toLowerCase())
        .filter(word => word.length > 2); // Ignore very short words like "a", "to", etc.

    return { intent, keywords };
};

// Optional: LLM-based intent detection function
const extractIntentWithLLM = async (llmResponse) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini', // Using gpt-4o-mini model
                messages: [
                    { role: 'system', content: 'Identify the intent of the following query from these options: \'get_courses\', \'get_location\', \'get_faculty_info\', \'get_admission_info\', \'general_info\'.' },
                    { role: 'user', content: llmResponse }
                ],
                max_tokens: 10,
                temperature: 0.0
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const intent = response.data.choices[0].message.content.trim();

        // Extract keywords from the LLM's response
        const keywords = llmResponse
            .split(' ')
            .map(word => word.toLowerCase())
            .filter(word => word.length > 2);

        return { intent, keywords };
    } catch (error) {
        console.error('Error in extractIntentWithLLM:', error);
        throw error;
    }
};

// Function to match keywords to database fields
const matchFieldsWithIntent = (keywords, collegeInfo) => {
    const results = [];
    Object.entries(collegeInfo).forEach(([field, value]) => {
        keywords.forEach(keyword => {
            if (field.includes(keyword) || value.includes(keyword)) {
                results.push({ field, value });
            }
        });
    });
    return results.length ? results[0] : null;
};

// Function to generate a conversational response with the LLM
const generateConversationalResponse = async (fieldData, userQuery) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini', // Using gpt-4o-mini model
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `User asked: "${userQuery}". Respond with information on "${fieldData.field}" in a conversational way: ${fieldData.value}` }
                ],
                max_tokens: 100,
                temperature: 0.6
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error in generateConversationalResponse:', error);
        throw error;
    }
};

// Exporting the functions using CommonJS
module.exports = {
    processQueryWithLLM,
    extractIntentAndKeywords,
    extractIntentWithLLM,
    matchFieldsWithIntent,
    generateConversationalResponse
};
