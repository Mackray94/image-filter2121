import bodyParser from 'body-parser';
import express from 'express';
import {Router,Request,Response} from 'express';
import { deleteLocalFiles, filterImageFromURL } from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT

  // GET /filteredimage?image_url={{URL}}

  // endpoint to filter an image from a public url.
  
  
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get( "/filteredimage", async( req:Request, res :Response) => {
    // destruct our query paramaters
     
     const validImage_url  = req.query.image_url.toString();
     if(!validImage_url)
       return res.status(400).send(`Input valid url`);
      
     else{
     //Process Image
       const filteredImage = await filterImageFromURL(validImage_url);
       if(filteredImage ===  undefined||filteredImage === null)
       return res.status(400).send(`Unable to filter image  `);
     else
       return res.status(200).sendFile(filteredImage,() => {
         deleteLocalFiles([filteredImage]);
       });

     }
   });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req:Request, res:Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  



  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();