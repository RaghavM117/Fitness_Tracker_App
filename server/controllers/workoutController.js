// just the logic for now
// important always scope to logged in user so example for findAll or finding single
//
// const workouts = await Cardio.find({ user: req.user._id }); // for findAll
// const workout = await Cardio.findOne({
//   _id: req.params.id,
//   user: req.user._id
// }); // for single to avoid other users from accessing each other's data
//
//
// also optional but supportive query fiter logic
//
//export const getCardio = async (req, res, next) => {
//   try {
//     const { startDate, endDate, sort, limit } = req.query;

//     const filter = { user: req.user._id };

//     if (startDate || endDate) {
//       filter.date = {};
//       if (startDate) filter.date.$gte = new Date(startDate);
//       if (endDate) filter.date.$lte = new Date(endDate);
//     }

//     let query = Cardio.find(filter);

//     if (sort) query = query.sort(sort);
//     if (limit) query = query.limit(Number(limit));

//     const workouts = await query;

//     res.status(200).json(workouts);

//   } catch (err) {
//     next(err);
//   }
// };
