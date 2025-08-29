import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/donations`;

export const donationService = {
    async createDonation(donationData) {
        try {
            const response = await axios.post(API_URL, donationData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    async getDonationsByCampaign(campaignId) {
        try {
            const response = await axios.get(`${API_URL}/campaign/${campaignId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};