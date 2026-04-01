export const validate = (validatorFn) => (req, res, next) => {
  const error = validatorFn(req.body);

  if (error) {
    return res.status(400).json({ msg: error });
  }

  next();
};