import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import e, { json } from "express";

export const createUserService = ({ email, name, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
      if (isEmail) {
        const isCheckEmail = await User.find({ email });
        const isCheckName = await User.find({ name });
        // console.log('isCheckEmail: ', isCheckEmail);
        // console.log('isCheckName" ', isCheckName);

        if (isCheckEmail.length || isCheckName.length) {
          resolve({
            status: "error",
            message: "The name of user name is existed",
          });
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          email,
          name,
          password: hashPassword,
        });

        resolve({
          status: "OK",
          data: {
            email: newUser.email,
            name: newUser.name,
          },
        });
      } else {
        resolve({
          status: "error",
          message: "user name is not a email",
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error,
      });
    }
  });
};

export const loginUserService = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
      if (isEmail) {
        const userDb = await User.find({ email });
        if (userDb) {
          const checkPassword = bcrypt.compareSync(
            password,
            userDb[0].password
          );

          if (checkPassword) {
            resolve({
              status: "OK",
              data: {
                name: userDb[0].name,
                email: userDb[0].email,
              },
            });
          }
          resolve({
            status: "Error",
            message: "The username or password is wrong",
          });
        } else {
          resolve({
            status: "error",
            message: "The username is not existed",
          });
        }
      } else {
        resolve({
          status: "error",
          message: "The username is not email",
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error,
      });
    }
  }).catch((e) => {
    console.log("error: ", e);
  });
};

export const getDetailsUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findById(id);
      if (findUser) {
        resolve({
          message: "Ok",
          status: findUser,
        });
      }
      resolve({
        message: "OK",
        status: "The user is not defind",
      });
    } catch (err) {
      reject({
        message: err,
        status: "err",
      });
    }
  }).catch((err) => err);
};

export const searchUserService = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findName = await User.find({ name: name });
      if (findName) {
        resolve({
          message: "Ok",
          status: findName,
        });
      }
      resolve({
        message: "OK",
        status: "The user is not defind",
      });
    } catch (e) {
      console.log(e);
      reject({
        message: e,
        stutus: "err",
      });
    }
  }).catch((err) => err);
};

export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne(data);
      if (checkUser) {
        return resolve({
          status: "err",
          message: "The info of user is duplicate",
        });
      }
      // PUT
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      //PATCH
      // const findUser = await User.findById(id);
      // findUser.name = data.name;
      // findUser.password = data.password;
      // await findUser.save();

      // console.log("checkUser", checkUser);
      if (updateUser) {
        // Nếu ko thêm {new: true} trong updateUser, thì có thể dùng cái này
        // const getUserNew = await getDetailsUserService(id);
        resolve({
          status: "OK",
          data: updateUser,
        });
      } else {
        return resolve({
          status: "err",
          message: "The user is not defind",
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        status: "error",
        message: e,
      });
    }
  });
};

export const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findByIdAndDelete(id);
      if (checkUser) {
        console.log("Id này tồn tại");
        return resolve({
          status: "OK",
          message: "Xóa thành công 50% rồi bạn ơi",
          data: checkUser,
        });
      } else {
        resolve({
          status: "err",
          message: "The id is not existed",
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        status: "error",
        message: e,
      });
    }
  });
};

export const deleteAllUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const deleteAll = await User.deleteMany(id);
        return resolve({
          status: "Đã xóa",
          data: deleteAll,
        });
      } else {
        resolve({
          status: "Error",
          message: "The id is not existed",
        });
      }
    } catch (err) {
      console.log(err);
      return reject({
        status: "error",
        message: err,
      });
    }
  });
};
