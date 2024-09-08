<p> TO run this in local -: install docker (sudo apt update , then sudo apt install docker.io -y) <br> then run command by going in the directory of this project -> docker build -t my-app . (to build docker image) <br> to run the image -: docker run -p 5000:5000 my-app <br> then use http://localhost:5000 instead of https://assingment-moneeflo.onrender.com because when generating invoice its taking to much time when giving endpint of hosted url (some problem is occuring because of using puppeteer in render) but by running docker on local it is running quickly. <br> To run this do these following things -:  <br> To register user endpoint is https://assingment-moneeflo.onrender.com/api/auth/register (POST) , in body give like -: <br> {
  "name": "xyz",
  "email": "xyz@gmail.com",
  "password": "password555"
} <br> To login the user, endpoint is https://assingment-moneeflo.onrender.com/api/auth/login (POST), in body give like -: <br> {
  "email": "xyz@gmail.com",
  "password": "password555"
} <br> It will provide you the token, copy that token <br> To generate the invoice, endpoint is https://assingment-moneeflo.onrender.com/api/invoices/generate (POST),but use http://localhost:5000 here. It will return the pdf url , either right click on that url it will open the pdf or endpoint to open that url is https://assingment-moneeflo.onrender.com/pdfUrl (here pdfUrl is which it will return you when you hit endpint of generating invoice). <br>   </p>
