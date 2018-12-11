

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

        let user = await models.Usuario.find({user:args.glosario.user.user,pass:args.glosario.user.pass});
        if(user.length==0){
          return {
            success: false,/*Se enviaron vacios o null*/
            errors: formatErrors({path:"user ^ pass",message:"Usuario no válido"})
          };
        }

        /*const counter = await models.Counters.findAndModify(
          { _id: 'contratos' }, [], { $inc: { sequence_value: 1 } },{"new":true/*, upsert:true*//*}
          //CallBack => ,function (err, counter) {
          //  if (err) throw err;
          //  console.log('updated, counter is ',counter.value.sequence_value);          
          //});

        if(counter.value){
          console.log("out: ",counter.value.sequence_value);
        }else{
          console.log("No existe. Se crea desde el valor 1000");
          const counter = await new models.Counters({_id:"contratos",sequence_value:1000}).save();
        }*/
        
        const glosario = await new models.Glosario(args.glosario).save();
        console.log(glosario);
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

        let user = await models.Usuario.find({user:args.glosario.user.user,pass:args.glosario.user.pass});
        if(user.length==0){
          return {
            success: false,/*Se enviaron vacios o null*/
            errors: formatErrors({path:"user ^ pass",message:"Usuario no válido1"})
          };
        }


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
