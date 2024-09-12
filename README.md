<p> To install each dependencies -> in starting run command -: npm install . <br> To run this in local -: install docker (sudo apt update , then sudo apt install docker.io -y) <br> then run command by going in the directory of this project -> docker build -t my-app . (to build docker image) <br> to run the image -: docker run -p 5000:5000 my-app <br> then use <b>http://localhost:5000</b> in postman endpoints instead of https://assingment-moneeflo.onrender.com because when generating invoice its taking to much time when using hosted url (some problem is occuring because of using puppeteer in render), but except this generating invoice case hosted url is working perfectly fine,if we run docker on local then invoice is generating quickly. <br> To run in postman do these following things -:  <br> To register user, endpoint is https://assingment-moneeflo.onrender.com/api/auth/register (Method -: POST) , in body give like (choose JSON format) -: <br> {
  "name": "xyz",
  "email": "xyz@gmail.com",
  "password": "password555"
} <br> To login the user, endpoint is https://assingment-moneeflo.onrender.com/api/auth/login (Method -: POST), in body give like(choose JSON format) -: <br> {
  "email": "xyz@gmail.com",
  "password": "password555"
} <br> It will provide you the token, copy that token <br> To generate the invoice, endpoint is https://assingment-moneeflo.onrender.com/api/invoices/generate (Method -: POST),but use http://localhost:5000 here.In headers in keys write - Authorization and in values - Bearer token (here copy that token value). <br> in body give like (choose JSON format)-: <br> {
    "products": [
        {
            "name": "Product 1",
            "qty": 50,
            "rate": 5
        },
        {
            "name": "Product 2",
            "qty": 60,
            "rate": 6
        }
    ]
} <br> It will return the pdf url , either Right-click the PDF URL and open it or endpoint to open that pdf is is https://assingment-moneeflo.onrender.com/pdfUrl <br> (Method -: GET) (Replace pdfUrl with the value returned when you generated the invoice). <br> To view all the PDF's, endpoint is https://assingment-moneeflo.onrender.com/api/invoices/view (Method -: GET) . In headers in keys write - Authorization and in values - Bearer token . <br> </p>
