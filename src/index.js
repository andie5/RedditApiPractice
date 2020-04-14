import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Reddit extends React.Component {
  state = {
    posts: [],
    error: null,
  };

  componentDidMount() {
    axios
      .get(`https://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((res) => {
        const posts = res.data.data.children.map((obj) => obj.data);
        this.setState({ posts });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log("Error generated: ", error.message);
      });
  }

  render() {
    const { posts, error } = this.state;

    if (!posts) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        {error ? (
          <div>{error}</div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <Reddit subreddit={"reactjs"} />,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
