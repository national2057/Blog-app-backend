function checkForAuthenticationCookie (cookieName) {
   return (req, res, next) => {
      const tokenCookieValue = req.cookies[cookieName];
      if (!tokenCookieValue){
         next();
      }
      const 
   }
}