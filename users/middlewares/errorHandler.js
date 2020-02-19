module.exports = function errorHandler(err, req, res, next) {
  let status, message;
  console.log(err)
  if(err.name === 'JsonWebTokenError') {
    status = 403;
    message = "Please login first, you are not logged in yet!";
  } else if (err.name === 'TokenExpiredError') {
    status = 403;
    message = "Your session is already expired! Please sign in again";
  } else if (err.name === "ValidationError") {
    status = 400;
    const arr = [];
    for (const key in err.errors) {
      arr.push(err.errors[key].message);
    }
    message = arr;
  } else if (err.status === 404) {
    status = 404;
    message = `${err.resource} not found!`
  } else {
    status = err.status || 500;
    message = err.message || "Internal Server Error";
  }
  
  res.status(status).json({error: message});
}