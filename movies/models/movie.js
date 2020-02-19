const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      validate: [{
        validator: function (value) {
          return Movie.findOne({
            id: {$ne: this._id},
            title: value
          })
            .then(data => {
              return !data
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: props => `This title ${props.value} has already been registered!`
      }]
    },
    overview: {
      type: String,
      required: [true, 'Overview is required']
    },
    poster_path: {
      type: String,
      required: [true, 'Poster is required'],
    },
    popularity: [{
      user: String,
      score: Number
    }],
    tags: [{
      type: String
    }],
    year: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie