// Post data to Web View API
async function postData(url = '', auth, data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  
  // method to sha256 encode string
  async function sha256(message) {
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }
  
  // Post data when form is submitted
  submitForm = async function() {
    // Get data from query string
    const queryParams = new URLSearchParams(document.location.search);
    const userId = queryParams.get('userId');
    const conversationId = queryParams.get('convId');
    const botId = queryParams.get('botId');
  
    // Get data from form
    const name = document.querySelector('input[name="user_name"]').value;
    const password = document.getElementById('password').value;;
  
    // use correct domain for your region
    const domain = 'https://va.bc-intg.liveperson.net/thirdparty-services-0.1/webview';
    
    // encode auth string
    const authString = `${conversationId} || ${botId}`;
    const auth = await sha256(authString);
  
    const res = await postData(domain, auth, {
      botId,
      conversationId,
      userId,
      message: "request successful", // optional
      contextVariables: [
        {"name": "name", "value": name},
        {"password": "password", "value": password}
      ],
    });
  }
