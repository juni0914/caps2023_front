const userDatabase = require("http://localhost:8080/user/all");
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    const {username, password} = req.body;
    const userInfo = userDatabase.filter(item=>{
        return item.username === username;
    })[0];

    if (!userInfo) {
        res.status(403).json("Not Authorized");
      } else {
        try {
          // access Token 발급
          const accessToken = jwt.sign({
            id : userInfo.id,
            username : userInfo.username
          }, process.env.ACCESS_SECRET, {
            expiresIn : '1m',
            issuer : 'About Tech',
          });

            // refresh 토큰 발급
            const refreshToken = jwt.sign({
                id : userInfo.id,
                username : userInfo.username
            },process.env.REFRECH_SECRET, {
                expiresIn : '24h',
                issuer : 'About Tech'
            });

            // 토큰 전송
            res.cookie("accessToken", accessToken,{
                secure : false,
                httpOnly : true,
            })

            res.cookie("refreshToken", refreshToken,{
                secure : false,
                httpOnly : true,
            })

            res.status(200).json("login success");

        } catch (error) {
            res.status(500).json(error);
        }
      }

    // console.log(userInfo);
    // next();
}

const accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userData = userDatabase.filter(item=>{
            return item.username === data.username;
        })[0];

        const {password, ...others} = userData;

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

const refreshToken = (req, res) => {
    // access 토큰 갱신
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRECH_SECRET)
        const userData = userDatabase.filter(item=>{
            return item.username === data.username;
        })[0]

        //access token 새로발급
        const accessToken = jwt.sign({
            id : userData.id,
            username : userData.username
          }, process.env.ACCESS_SECRET, {
            expiresIn : '1m',
            issuer : 'About Tech',
          });

          res.cookie("accessToken", accessToken,{
            secure : false,
            httpOnly : true,
        })

        res.staus(200).json("Access Token Recreated")
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginSuccess = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        
        const userData = userDatabase.filter(item=>{
            return item.username === data.username;
        })[0];

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json(error);
    }
}

const logout = (req, res) => {
    try {
        res.cookie('accessToken', '');
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports ={
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout
}