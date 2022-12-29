import { Music } from "../models/musicModel.js";

export const createMusicService = ({ song, image, author, url }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newMusic = await Music.create({
        song,
        image,
        author,
        url,
      });

      resolve({
        status: "OK",
        data: {
          song: newMusic.song,
          image: newMusic.image,
          author: newMusic.author,
          url: newMusic.url,
        },
      });
    } catch (error) {
      reject({
        status: "error",
        message: error,
      });
    }
  });
};

export const deleteMusicService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMusic = await Music.findByIdAndDelete(id);
      if (checkMusic) {
        console.log("Id này tồn tại");
        return resolve({
          status: "OK",
          message: "Xóa bài hát thành công rồi bạn ơi",
          data: checkMusic,
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

export const searchSongService = (song) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findSong = await Music.find(song);
      if (findSong) {
        resolve({
          message: "Ok",
          status: findSong,
        });
      }
      resolve({
        message: "OK",
        status: "The song is not defind",
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

export const getAllMusic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const findSong = await Music.find({});
      if (findSong) {
        resolve({
          message: "Ok",
          status: findSong,
        });
      }
      resolve({
        message: "OK",
        status: "The song is not defind",
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
