import originalFetch from 'isomorphic-fetch';
import fetchBuilder from 'fetch-retry-ts';

/**
 * Carbon Intensity API Fails a bit 
 */
const options = {
    retries: 3,
    retryDelay: 1000,
    retryOn: [500, 419, 503, 504],
};

export const fetch = fetchBuilder(originalFetch, options);