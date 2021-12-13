module.exports = function(permittedRoles){
    return (req,res,next) => {
      const  user = req.user.user;
      let isAllowed = false;
   console.log(user.roles);
      user.roles.map( (role) => {
if ( permittedRoles.includes(role)){
    isAllowed = true;
}
      });


if ( !isAllowed) {
    return res.status(400).json({
        status : "failed",
        message : "You are not allowed to accesss this"
    });
}
    next();
    }
}