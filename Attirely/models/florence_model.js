import { pipeline } from '@xenova/transformers';

// Initialize the pipeline for image captioning
let descriptionPipeline;

export const loadModel = async () => {
    descriptionPipeline = await pipeline('image-captioning', 'gokaygokay/Florence-2-Flux-Large');
};

export const generateDescription = async (imageUri) => {
    if (!descriptionPipeline) {
        throw new Error('Model not loaded. Please call loadModel() first.');
    }

    // Call the pipeline to get the description
    const response = await descriptionPipeline(imageUri);
    return response[0].generated_text; // Adjust based on the output format of the model
};