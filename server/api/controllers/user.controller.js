import userService from "../services/user.service";

const test = (request, response) => {
  const promise = userService.test();
    response.status(200);
     response.json(promise);
};


const getUsers = (request, response) => {
  const promise = userService.search();
  promise.then((users) => {
    response.status(200);
    response.json(users);
  });
};

export default {
      getUsers: getUsers, 
      test: test 
}