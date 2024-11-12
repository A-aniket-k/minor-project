// controllers/queryController.js
const nlpService = require('../services/nlpService');
const CollegeInfo = require('../models/collegeInfo');

exports.handleEnhancedQuery = async (req, res) => {
    try {
        const { query } = req.body;

        // Step 1: Process the query with the NLP service (LLM)
        const refinedQuery = await nlpService.processQueryWithLLM(query);

        // Step 2: Extract intent and keywords from the LLM’s response
        const { intent, keywords } = nlpService.extractIntentAndKeywords(refinedQuery);

        // Step 3: Query the database using semantic matching for college information
        const collegeInfos = await CollegeInfo.find({});
        if (!collegeInfos || collegeInfos.length === 0) {
            return res.json({ answer: "Sorry, no information found." });
        }

        let bestMatch;
        collegeInfos.forEach(collegeInfo => {
            const match = nlpService.matchFieldsWithIntent(keywords, collegeInfo);
            if (match) bestMatch = match;
        });

        // Step 4: Generate a conversational response
        if (bestMatch) {
            const finalResponse = await nlpService.generateConversationalResponse(bestMatch, query);
            return res.json({ answer: finalResponse });
        }

        return res.json({ answer: "Sorry, I couldn't find an answer to that question." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
