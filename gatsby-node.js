exports.createPages = async ({ graphql, actions, reporter }) => {
// paramenters (slug)

  const resultado = await graphql(`
       query {
        allDatoCmsHabitacion {
          nodes {
              slug
          }
        }
      }
  `);
  // console.log(resultado.data.allDatoCmsHabitacion.nodes);
  
  if(resultado.errors){
    reporter.panic('No hubo resultados', resultado.errors);
  }
  
  //si hay paginas , crear archivos
  const habitaciones = resultado.data.allDatoCmsHabitacion.nodes;
  
  
  
  // paramenters (slug)

  habitaciones.forEach(habitacion => {
    actions.createPage({
        path: habitacion.slug,
        component:require.resolve('./src/components/habitacion.js'),
        context : {
            slug:habitacion.slug
        }
    })    
  })
  
  
  // const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
}
