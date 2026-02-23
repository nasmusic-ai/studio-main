const token = jwt.sign(
  {
    userId: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET as string,
  { expiresIn: "7d" }
);