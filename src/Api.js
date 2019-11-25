import axios from "axios";

export const fetchData = () => {
  const userPromise = fetchUser();
  const postsPromise = fetchPost();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
};

const wrapPromise = promise => {
  //set initial status
  let status = "pending";
  //store result
  let result;
  //Wait for promise
  let suspend = promise.then(
    res => {
      status = "success";
      result = res;
    },
    err => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      } else if ((status = "succes")) {
        return result;
      }
    }
  };
};

const fetchUser = () => {
  console.log("Fetching User...");
  return axios
    .get("https://jsonplaceholder.typicode.com/users/7")
    .then(res => res.data)
    .catch(err => console.log(err));
};

const fetchPost = () => {
  console.log("Fetching Posts...");
  return axios
    .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(res => res.data)
    .catch(err => console.log(err));
};
