import jwt from 'jsonwebtoken';

const verifyToken = async (req, reply) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_KEYID, (err, decoded) => {
    if (err) {
      let messageArray = ['jwt expired', 'invalid token'];
      
      if(messageArray.includes(err.message)){
        reply.status(401).send({
          "statusCode": 401,
          "status": false,
          "message": "Token expired"
        });
      } else {
        reply.status(401).send({
          "statusCode": 401,
          "status": false,
          "message": "User is not authorized"
        });
      } 
    }
     
    if(req && req.body){
      req.body.userId = decoded.id;
    }
    
  });
};

export default verifyToken;