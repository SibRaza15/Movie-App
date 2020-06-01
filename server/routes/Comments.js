const express = require("express");
const router = express.Router();
const { Comments } = require("../models/Comments");

const { auth } = require("../middleware/auth");

//=================================
//             Comments
//=================================

router.post("/saveComments", auth, (req, res) => {
  const comments = new Comments(req.body);

  comments.save((err, comments) => {
    console.log(err);
    if (err) return res.json({ success: false, err });

    Comments.find({ _id: comments._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comments.find({ postId: req.body.postId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
