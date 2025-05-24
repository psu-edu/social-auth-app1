// Import the mongoose module to define schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the user schema with validation
const userSchema = new mongoose.Schema({
  // Provider must be either 'google' or 'facebook'
  provider: {
    type: String,
    required: true, // Make provider mandatory
    enum: ['google', 'facebook'], // Only accept these two providers
  },

  // Provider-specific user ID, must be a non-empty string
  providerId: {
    type: String,
    required: true, // Mandatory field
    trim: true, // Remove leading/trailing spaces
  },

  // Display name must be present and meaningful
  displayName: {
    type: String,
    required: true, // Required field
    trim: true,
    minlength: 2, // Minimum length for a valid name
  },

  // Email is optional but must be in valid format if provided
  email: {
    type: String,
    trim: true,
    lowercase: true, // Convert email to lowercase
    validate: {
      validator: function (v) {
        // Regex to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  }
});

// Export the compiled model to use in the app
module.exports = mongoose.model('User', userSchema);
