import userService from "../services/user.service";
import 'babel-polyfill';


const login = async (request, response) => {
  const user = request.userPayload;
  const orgID = request.params.id;
  const promise = await userService.login(user,orgID);
    response.status(200);
    response.json(promise);
};


const getUsers = (request, response) => {
  const googleID = request.userPayload.googleID;
  const promise = userService.user(googleID);
  promise.then((user) => {
    const prom = userService.search(user.orgID);
    prom.then((users) => {
      response.status(200);
      response.json(users);
    });
  });
};

const getUser = (request, response) => {
  const googleID = request.userPayload.googleID;
  const promise = userService.user(googleID);
  promise.then((user) => {
    response.status(200);
    response.json(user);
  });
};

const updateProfile = (request, response) => {
  const googleID = request.userPayload.googleID;
  const profile =  {...request.body};
  const promise = userService.user(googleID);
  promise.then((user) => {
    const prom = userService.profile(user,profile);
    prom.then((u) => {
      response.status(200);
      response.json(u);
    });
  });
};


export default {
      getUsers: getUsers,
      login: login, 
      getUser: getUser,
      updateProfile: updateProfile
}