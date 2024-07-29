const jwtMiddlewareTest = async(req,res) =>{
   try {
     res.status(200).json({success: true, message: 'token is correct you can proceed further' })
   } catch (error) {
     console.error("error verifying token",error.message)
   }
}
module.exports = {
    jwtMiddlewareTest
}