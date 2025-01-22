import Review from "../moduless/review.js";

export function addReview(req, res) {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  const { rating, comment } = req.body;

  // Validate request body
  if (!rating || !comment) {
    return res.status(400).json({
      error: "Rating and comment are required",
    });
  }

  // Construct review data
  const data = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    profilePicture: req.user.profilePicture,
    email: req.user.email,
    rating,
    comment,
  };

  // Save review to database
  const newReview = new Review(data);

  newReview
    .save()
    .then(() => {
      res.json({ message: "Review added successfully" });
    })
    .catch((error) => {
      console.error("Error saving review:", error); // Log the error for debugging
      res.status(500).json({
        error: "Review addition failed",
      });
    });
}
