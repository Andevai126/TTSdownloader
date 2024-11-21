# TTSdownloader
A simple tool to convert text into mp3 files.

## Installation
```sh
cd proxyserver
npm install
```

## Usage
1. Start the proxy server
   ```sh
   cd proxyserver
   node index.js
   ```
2. Open page.html in your favorite browser.
3. Fill the textarea with your input. Note that each line (enter-seperated) will become one mp3 file. These can be sentences or words.
4. Choose the nationality of the voice.
5. Click on Submit.
   For more information about the downloads, view the inspector in your browser, or review the logs of the proxy server.
   Once complete, the mp3 files can be found in /sounds.
6. Remove the first 150 milliseconds and the last 200 milliseconds of each mp3 file.
   ```sh
   python audioCutter.py
   ```
   The shortend mp3 files will appear in /cuts.

## Notes
- The special characters that are not allowed in file names are automatically filtered.
- The communication between page.hmtl and index.js sometimes breaks when the internet connection is weak.
- Some extra installs might be required for audioCutter.py.
- This script makes use of a third-party api. Do not abuse his api by over-using mine.