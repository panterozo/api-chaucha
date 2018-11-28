

const formatErrors = (error/*,otherErrors*/)=>{
  const errors=error.errors;
  let objErrors = []

  const uknownError = {}

  uknownError.path = error.path;
  uknownError.message = error.message;
  return [uknownError]
}


function mergeObject(objBase, ObjUpdate) {
	for (var property in ObjUpdate) {    
   	objBase[property] = ObjUpdate[property];
	}
}


export default {
  Query: {

    getGlosario: async (parent, args, {models}) => {
      //console.log(args._id);

      var obj = {};      
      if(args.title){/*TODO: Hacer match cuando se envíe un titulo*/
        //obj["title"] = args.title; 
      }
      if(args.definition){/*TODO: Hacer match cuando se envíe una definition*/
        //obj["definition"] = args.definition; 
      }
      

      return await models.Glosario.
        find(obj).
        exec(function (err, glosario) {
          if (err) return handleError(err);
          console.log(glosario);          
        });

      
    },

  },
  Mutation:{

    newDefinition: async (parent, args, {models}) => {
      try{
        const glosario = await new models.Glosario(args.glosario).save();
        return {
            success: true,
            errors: []
          };
      }catch(error){
        return {
          success: false,
          errors: formatErrors(error)
        };
      }
    },
    updateDefinition: async (parent, args, {models}) => {
      try{
        if( (args.glosario.title=='' || args.glosario.title == null) 
          && (args.glosario.definition=='' || args.glosario.definition == null)  ){
          return {
            success: false,/*Se enviaron vacios o null*/
            errors: formatErrors({path:"title ^ definition",message:"Valores no válidos"})
          };
        }
        const glosario = await models.Glosario.findById(args.glosario._id);
        /*Se hace un merge de los objetos por su key*/
        mergeObject(glosario,args.glosario);
        /*Se guarda el nuevo objeto actualizado*/
        await glosario.save();
        return {
            success: true,
            errors: []
          };
      }catch(error){
        return {
          success: false,
          errors: formatErrors(error)
        };
      }

    }


  }
}
