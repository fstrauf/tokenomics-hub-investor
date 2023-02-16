
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { values } = req.body;
  
  var Resources = values.Resources
  if(typeof values.Resources === 'object'){
    Resources = JSON.stringify(values.Resources)
  }
  
  const response = await prisma.designPhases.update({
    where: {
      id: values.id,
    },
    data:{
      id: values.id,
      name: values.name,
      parentPhaseId: values.parentPhaseId,
      Resources: Resources,
    },    
  })

  res.json(response);
}
