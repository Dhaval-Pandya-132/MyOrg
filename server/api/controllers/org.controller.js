import orgService from "../services/org.service";
import 'babel-polyfill';

const getOrg = (request, response) => {
    const id = request.params.id;
    const promise = orgService.search(id);
    promise.then((org) => {
    response.status(200);
    response.json(org);
  }).catch(handleError(response)); 
};

const saveOrg = (request, response) => {
    const org =  {...request.body};
    console.log(org);
    const promise = orgService.save(org);
    promise.then((org) => {
    response.status(200);
    response.json(org);
  }).catch(handleError(response)); 
  
};

// Error Handlor function
const handleError = (response) =>{
  return (error)=> {
      if (error) {
          response.status(500);
          response.json({
              message: error.message
          });
      }
  }
}


export default {
    getOrg: getOrg,
    saveOrg: saveOrg    
}