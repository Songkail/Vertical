import './App.css';
import React, { useState, useEffect } from 'react';
import { database } from './firebase.js';

function App() {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = database.ref('posts');
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      const postsArray = Object.entries(postsData || {}).map(([key, value]) => ({ id: key, ...value }));
      setPosts(postsArray);
    });
  }, []);

  function addPost() {
    if(document.getElementById("nickname-input").value !== '' && document.getElementById("write-input").value !== '') {
      const newPostRef = database.ref('posts').push();
      newPostRef.set({ content: document.getElementById("nickname-input").value + ' - ' + postContent });
      setPostContent('');
    }
  }

  function handleChange(event) {
    setPostContent(event.target.value);
  }

  return (
    <>
      <div id="nickname-wrapper">
        <input type="text" id="nickname-input" placeholder="별명을 입력하세요. (실명 사용을 권유하지 않습니다.) " />
      </div>

      <div id="write-wrapper">
        <textarea id="write-input" placeholder="내용을 입력하세요. " value={postContent} onChange={handleChange} />
        <button id="write-reg" onClick={addPost}><b>등록</b></button>
      </div>

      <div id="post-wrapper">
        {posts.map((post) => (
          <div key={post.id} className="content">
            <div id="post-content">{post.content}</div>
          </div>
        ))}
      </div>

      <a href='https://github.com/Songkail/Community'><div id="githubBtn-wrapper" style={{ width: "220px", height: "30px", position: "absolute", left: "5px", bottom: "25px"}}>
        <div id="githubBtn-icon"></div>
        <span>GitHub Repository</span>
      </div></a>

      <div style={{ position: "absolute", left: "5px", bottom: "5px"}}>
        <b>📢 vertical 웹서비스는 개인개발 스튜디오인 Songkail Studio에서 코딩을 공부하고 있는 Songkail 학생이 운영이 아닌 백엔드 개발과 학습을 목적으로 개발한 사이트입니다. </b>
        <span id="topBar-copyright" style={{color: "grey", marginLeft: "10px"}}>Copyright © 2023 Songkail Studio All rights reserved.</span>
      </div>
    </>
  );
}

export default App;
