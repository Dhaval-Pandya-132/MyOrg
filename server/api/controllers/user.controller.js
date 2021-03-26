import userService from "../services/user.service";

const getUsers = (request, response) => {
  const promise = userService.search();
  promise.then((users) => {
    response.status(200);
    response.json(users);
  });
};

export default {getUsers}