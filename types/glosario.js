export default `

  type Glosario{
    _id: String
    title: String
    definition: String
  }


  input GlosarioInputCreate{
    title: String!
    definition: String!    
  }

  input GlosarioInputUpdate{
    _id: String!
    title: String
    definition: String
  }


  type ErrorGlosario{
    path: String
    message: String
  }

  type GlosarioResponse{
    success: Boolean!
    errors: [ErrorGlosario]    
  }



  type Query{

    getGlosario(title: String, definition: String): [Glosario]!

  }

  type Mutation{

    newDefinition(
      glosario: GlosarioInputCreate
    ): GlosarioResponse!

    updateDefinition(
      glosario: GlosarioInputUpdate
    ): GlosarioResponse!

  }

`;
