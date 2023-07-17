const API_URL = 'http://localhost:7000/api/users/authenticate'

async function sendRequest(url,options) {
 const response = await fetch(url,options);
 return await response.json();
}

function createRequestOptions(method, body) {
 return{
 method,
 headers: {
  'Content-Type': 'application/json'
},
withCredentials: true,
body: JSON.stringify(body),
};
}

async function fetchUsers(API_URL) {
 return await sendRequest(API_URL);
}

async function authUser(userCredentials){
  const options = createRequestOptions('POST',userCredentials);
  return await sendRequest(API_URL, options);
 }


async function createUser(user , API_URL) {
 const options = createRequestOptions('POST',user);
 return await sendRequest(API_URL, options);
}

async function updateUser(userId, user , API_URL) {
 const options = createRequestOptions('PATCH',user);
 return await sendRequest (`${API_URL}/${userId}`, options);
}

async function deleteUser(userId , API_URL) {
 const options = createRequestOptions('DELETE');
 await sendRequest(`${API_URL}/${userId}`,options);
}

export default {
fetchUsers,
createUser,
updateUser,
deleteUser,
authUser
}









