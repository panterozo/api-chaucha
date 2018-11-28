import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import "dotenv/config";

import models from './models'
//mezclar todos los archivos de carpetas de types y resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', 
  bodyParser.json(), 
  graphqlUploadExpress(),
  graphqlExpress((req)=>{
    
  return {
    schema,
    context: {
      models,
      SECRET: process.env.SECRET,
      user: req.user
    }
  }
}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
app.use(express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/chaucha', {useMongoClient: true}).then(
  async () => {
    console.log('Conectado a Mongo!!!!')
    app.listen(process.env.PORT, ()=>{
      console.log('Running GRAPHQL server...'); 
    });     
  },
  err => {
	console.log("Error en conexión a mongoDB:\n"+err);	
   }
)
