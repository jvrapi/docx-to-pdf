const express = require('express')
const cors = require('cors')

const app = express()

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const path = require('path');
const fs = require('fs').promises;

app.use(cors())
app.use(express.json())

app.get('/transform', async (request, response) => {
  const ext = '.pdf'
      const inputPath = path.join(__dirname, `/documents/input/test.docx`);
      const outputPath = path.join(__dirname, `/documents/output/test${ext}`);
  try {
     // Read file
     const docxBuf = await fs.readFile(inputPath);

      
     // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
     let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
     
     // Here in done you have pdf file which you can save or transfer in another stream
     await fs.writeFile(outputPath, pdfBuf);

     return response.status(204).send()
  } catch (error) {
    console.log(error)
  }
     
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(` Server is running on port: ${PORT}`)
})

