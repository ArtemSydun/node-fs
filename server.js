const app = require('./src/app/index.js');

const { connectDb } = require('./src/db/connection');
const { temporaryAvatarsFolder, finalAvatarsFolder } = require('./src/helpers/constants.js');
const { createFolderIsNotExist } = require('./src/helpers/createFolder.js');

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, (err) => {
      if (err) {
        console.log('Error at server launch', err)
      }
      console.log(`Server running on port ${PORT}`);
    })

    await createFolderIsNotExist(temporaryAvatarsFolder);
    await createFolderIsNotExist(finalAvatarsFolder);
  }
  catch (error) { 
    console.log(error);
  }
}



startServer();
