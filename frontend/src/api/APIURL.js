// ENTER YOUR EC2 PUBLIC IP/URL HERE
const ec2_url = ''
// CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
const ec2 = false;
// USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
//const apiURL = ec2 ? ec2_url : 'http://54.242.160.117:8000/';

const apiURL = ec2 ? ec2_url : 'http://localhost:8000/';

export default apiURL;