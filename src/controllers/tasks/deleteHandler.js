
import Task from "../../models/taskSchema.js";

const DeleteHandler = async (req, res) => {
  try {
    const { _id } = req.params;
    const findTask = await Task.findOneAndDelete({ _id: _id });
    console.log("deleted", _id, findTask);
    if (findTask) {
      // History
      // const history = new History({ findTask });
      // await history.save();
      // if (history) {
      // await Task.deleteOne({ _id });
      res.json({ success: true, message: "deleted", deletedId: _id });
      // }
    }
  } catch (error) {
    console.log("error in delete", error);
  }
};

export default DeleteHandler;
