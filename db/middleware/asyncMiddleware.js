const asyncMiddleware = fn =>
  (req, res, next) => {
  	//console.log(req.body + "\n");
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
 
module.exports = asyncMiddleware;