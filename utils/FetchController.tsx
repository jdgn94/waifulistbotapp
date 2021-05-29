const baseURL = 'https://waifulistbotapi.herokuapp.com/api/';
// const baseURL = 'http://192.168.1.3:3000/api/';

const get = async (url: string): Promise<any> => {
  console.log('llamando a ', baseURL + url);
  // const result = await axios.get(url)
  //   .then(res => res)
  //   .catch(err => err);
  const result = await fetch(baseURL + url)
    .then(res => res)
    .catch(err => err.response);
  return result;
}

const post = async (url: string, body: Object) => {
  // const result = await axios.post(url, body)
  //   .then(res => res)
  //   .catch(err => err);
  // return result;
  const result = await fetch(baseURL + url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => res)
    .catch(err => err.response);

  return result;
}

export default { get, post };