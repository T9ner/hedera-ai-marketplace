const axios = require('axios');
const FormData = require('form-data');

class IPFSUploader {
    constructor() {
        this.pinataApiKey = process.env.PINATA_API_KEY;
        this.pinataSecretKey = process.env.PINATA_SECRET_KEY;
        this.pinataBaseUrl = 'https://api.pinata.cloud';
    }

    async uploadJSON(jsonMetadata) {
        try {
            const data = JSON.stringify(jsonMetadata);
            const config = {
                method: 'post',
                url: `${this.pinataBaseUrl}/pinning/pinJSONToIPFS`,
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': this.pinataApiKey,
                    'pinata_secret_api_key': this.pinataSecretKey
                },
                data: data
            };

            const response = await axios(config);
            console.log(`📁 JSON uploaded to IPFS: ${response.data.IpfsHash}`);
            return response.data.IpfsHash;
        } catch (error) {
            console.error("Error uploading JSON to IPFS:", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const config = {
                method: 'post',
                url: `${this.pinataBaseUrl}/pinning/pinFileToIPFS`,
                headers: {
                    'pinata_api_key': this.pinataApiKey,
                    'pinata_secret_api_key': this.pinataSecretKey,
                    ...formData.getHeaders()
                },
                data: formData
            };

            const response = await axios(config);
            console.log(`🗂️ File uploaded to IPFS: ${response.data.IpfsHash}`);
            return response.data.IpfsHash;
        } catch (error) {
            console.error("Error uploading file to IPFS:", error);
            throw error;
        }
    }
}

module.exports = IPFSUploader;
