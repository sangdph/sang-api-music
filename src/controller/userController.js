import { response } from "express";
import { createUserService, deleteAllUserService, deleteUserService, getDetailsUserService, loginUserService, searchUserService, updateUserService } from "../services/UserService.js";

export const userController = (req, res) => {
    res.send("User page");
};

export const detailsUserController = async (req, res) => {
    try{
        const {userId} = req.params;
        if(userId){
            const response = await getDetailsUserService(userId);
            return res.json(response);
        }
        return req.json({
            status: "error",
            message: "The email or password is required"
        })
    }catch(err){
        console.log(err);
        return res.json({
            status: "err",
            message: err
        })
    }
};

export const searchUserController = async (req, res) =>{
    try{
        const name = req.query;
        if(name){
            const response = await searchUserService(name);
            return res.json(response)
        }else{
            return res.json({
                status: "err",
                message: "The name is required"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            status: "err",
            message: err
        })
    }
}

export const idUserController = (req, res) => {
    res.render("user");
};

export const createUserController = async (req, res) => {
    var { email, password, name } = req.body;

    if (email && password && name) {
        const response = await createUserService({ email, password, name });
        return res.json(response);
    } else {
        return res.json({
            status: "error",
            message: "The email, name and password are required",
        });
    }
};

export const loginUserController = async (req, res) => {
    var { email, password} = req.body;

    if (email && password) {
        const response = await loginUserService({ email, password});
        return res.json(response);
    } else {
        return res.json({
            status: "error",
            message: "The email and password are required",
        });
    }
};

export const updateUserController = async(req, res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        if(id){
            const response = await updateUserService(id, data);
            if(response){
                return res.json(response);
            }else{
                return res.json({
                    status: "error",
                    message: "The server is problem"
                })
            }
        }else{
            return res.json({
                status: "error",
                message: "The id of user is required"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            status: "error",
            message: err
        })
    }
}

export const deleteUserController = async (req, res) =>{
    try{
        const {id} = req.params;
        if(id){
            // console.log("id: ", id);
            const response = await deleteUserService(id);
            if(response){
                return res.json(response);
            }else{
                return res.json({
                    status: "err",
                    message: "The server is problem"
                })
            }
        }else{
            return res.json({
                status: "err",
                message: "The id is required"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            status: "error",
            message: err
        })
    }
}

export const deleteAllUserController = async (req, res) =>{
    try{
        const id = req.query;
        console.log("id: ", id);
        if(id){
            const response = await deleteAllUserService(id);
            return res.json({
                status: "Ok",
                message: response
            })
        }else{
            return res.json({
                status: "error",
                message: "The id is not defind"
            })
        }
    }catch(err){
        console.log('error: ', err);
        return res.json({
            status: 'error',
            message: err
        })
    }
}