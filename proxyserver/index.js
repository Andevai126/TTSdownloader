const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/proxy', async (req, res) => {
    const { url, filename } = req.body;
    if (!url || !filename) {
        return res.status(400).json({ error: 'URL and filename are required' });
    }

    try {
        const response = await fetch(url, {
            headers: {
                responseType: "blob"
            }
        });
        if (!response.ok) {
            throw new Error('Response not OK');
        }

        const invalidCharsRegex = /[\\/:\*\?"<>|]/g; // \ / : * ? " < > |
        const filteredFilename = filename.replace(invalidCharsRegex, '');

        const fileStream = fs.createWriteStream(path.join(__dirname, '../sounds/', filteredFilename));
        

        // Pipe the response body to the file stream
        response.body.pipe(fileStream);

        fileStream.on('finish', () => {
            console.log('File \"', filteredFilename, '\" downloaded successfully');
            res.status(200).json({ message: 'File downloaded successfully' });
        });

        fileStream.on('error', (err) => {
            console.error('File download error:', err);
            console.log('File \"', filteredFilename, '\" failed to download');
            res.status(500).json({ error: 'File download error' });
        });
    } catch (error) {
        console.error('Proxy error:', error);
        console.log('File \"', filteredFilename, '\" failed to download');
        res.status(500).json({ error: 'Proxy error occurred' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
