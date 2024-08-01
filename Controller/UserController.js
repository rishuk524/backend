const UserModels = require("../Models/UserModels")


const getUserDetails = async (req, res) => {
  try {
    const user = await UserModels.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Search Users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await UserModels.find({ username: new RegExp(query, 'i') }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add Friend
const addFriend = async (req, res) => {
  try {
    const user = await UserModels.findById(req.user.id);
    const friend = await UserModels.findById(req.body.friendId);

    if (!friend) {
      return res.status(404).json({ msg: 'Friend not found' });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ msg: 'Already friends' });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Remove Friend
const removeFriend = async (req, res) => {
  try {
    const user = await UserModels.findById(req.user.id);
    const friendId = req.body.friendId;

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.friends = user.friends.filter(friend => friend.toString() !== friendId);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
    getUserDetails,
    searchUsers,
    addFriend,
    removeFriend
}