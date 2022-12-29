import userRouter from './user.js';
import musicRouter from './music.js';
const routes = (app) => {
    app.use("/user", userRouter);
    app.use("/music", musicRouter);
    
    app.use("/", (req, res) => {
        res.render("home", {
            isShow: true,
            helpers: {
                message() {
                    return "Lap trinh that de";
                },
                noti() {
                    return "error";
                },
            },
        });
    });

    
};

export default routes;