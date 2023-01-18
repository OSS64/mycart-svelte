import jwt from 'jsonwebtoken';

const verifyToken = async (req, reply) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        reply.status(401).send({
          "statusCode": 401,
          "error": "Unauthorized",
          "message": "No token was sent"
      });
    }
    if(req && req.body){
      req.body.userId = decoded.id;
    }
    
  });
};

export default verifyToken;