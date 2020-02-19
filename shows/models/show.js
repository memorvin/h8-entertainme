const mongoose = require('mongoose')

const ShowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      validate: [{
        validator: function (value) {
          return Show.findOne({
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

const Show = mongoose.model('Show', ShowSchema);
module.exports = Show