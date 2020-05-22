export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { 'Authorization': 'Bearer '+ user.token };       // for Node.js Express back-end
  } else {
    return {};
  }
}
