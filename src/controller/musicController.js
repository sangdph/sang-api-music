import {
  createMusicService,
  deleteMusicService,
  getAllMusic,
  searchSongService,
} from "../services/MusicService.js";

export const songController = async (req, res) => {
  const response = await getAllMusic();
  return res.json(response);
};

export const createSongController = async (req, res) => {
  var { song, image, author, url } = req.body;

  if (song && image && author && url) {
    const response = await createMusicService({ song, image, author, url });
    return res.json(response);
  } else {
    return res.json({
      status: "error",
      message: "The song, image, author and url are required",
    });
  }
};

export const deleteMusicController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      // console.log("id: ", id);
      const response = await deleteMusicService(id);
      if (response) {
        return res.json(response);
      } else {
        return res.json({
          status: "err",
          message: "The server is problem",
        });
      }
    } else {
      return res.json({
        status: "err",
        message: "The id is required",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: err,
    });
  }
};

export const searchSongController = async (req, res) => {
  try {
    const { song } = req.query;
    if (song) {
      const response = await searchSongService({ song: { $regex: song } });
      return res.json(response);
    } else {
      return res.json({
        status: "err",
        message: "The song is required",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "err",
      message: err,
    });
  }
};
