import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faReply, faHeart } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';
import './ForumDetailComponent.css';

const ForumDetailComponent = ({ forums, handleNewPost }) => {
  const { forumId } = useParams();
  const [forum, setForum] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [reply, setReply] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [userLikes, setUserLikes] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const forumData = forums.find((forum) => forum.id === parseInt(forumId));
    if (forumData) {
      setForum(forumData);
    }
  }, [forumId, forums]);

  const parseMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    return text.split(mentionRegex).map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="mention">@{part}</span>;
      }
      return part;
    });
  };

  const addNotification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: prevNotifications.length + 1, message },
    ]);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== prevNotifications.length)
      );
    }, 10000); // Remove notification after 10 seconds
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostData = {
        id: forum.posts.length + 1,
        user: 'CurrentUser',
        content: newPost,
        likes: 0,
        replies: [],
      };
      handleNewPost(forum.id, newPostData);
      setNewPost('');
      addNotification('New post added!');
    }
  };

  const handleReplySubmit = (postId, replyContent) => {
    if (replyContent.trim()) {
      const updatedPosts = forum.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: post.replies.length + 1,
                user: 'CurrentUser',
                content: replyContent,
                likes: 0,
                pinned: false,
              },
            ],
          };
        }
        return post;
      });

      setForum({ ...forum, posts: updatedPosts });
      setReply({ ...reply, [postId]: '' });
      addNotification('New reply added!');
    }
  };

  const handleLike = (postId, isReply, replyId) => {
    const likeId = isReply ? `reply-${postId}-${replyId}` : `post-${postId}`;

    const updatedPosts = forum.posts.map((post) => {
      if (post.id === postId) {
        if (isReply) {
          return {
            ...post,
            replies: post.replies.map((reply) => {
              if (reply.id === replyId) {
                const updatedLikes = userLikes.has(likeId) ? reply.likes - 1 : reply.likes + 1;
                return { ...reply, likes: updatedLikes };
              }
              return reply;
            }),
          };
        } else {
          const updatedLikes = userLikes.has(likeId) ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: updatedLikes };
        }
      }
      return post;
    });

    if (userLikes.has(likeId)) {
      userLikes.delete(likeId);
    } else {
      userLikes.add(likeId);
    }

    setUserLikes(new Set(userLikes));
    setForum({ ...forum, posts: updatedPosts });
  };

  const handlePinPost = (postId) => {
    const updatedPosts = forum.posts.map((post) =>
      post.id === postId ? { ...post, pinned: !post.pinned } : post
    );
    setForum({ ...forum, posts: updatedPosts });
  };

  const handlePinReply = (postId, replyId) => {
    const updatedPosts = forum.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          replies: post.replies.map((reply) =>
            reply.id === replyId ? { ...reply, pinned: !reply.pinned } : reply
          ),
        };
      }
      return post;
    });
    setForum({ ...forum, posts: updatedPosts });
  };

  const handleToggleReplies = (postId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [postId]: !prevShowReplies[postId],
    }));
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="forum-detail">
      <header className="header">
       <div className="logo">CollaborateHub</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <BackButton />
      {forum ? (
        <>
        <h2>{forum.name} Forum</h2>
          <div className="notifications">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification">
                {notification.message}
              </div>
            ))}
          </div>
          <div className="chat-window">
            <ul>
              {forum.posts &&
                forum.posts.map((post) => (
                  <li key={post.id} className={`post ${post.pinned ? 'pinned' : ''}`}>
                    <div>
                      <strong>{post.user}:</strong> {parseMentions(post.content)}
                      <span
                        className="pin-button"
                        onClick={() => handlePinPost(post.id)}
                        role="button"
                        aria-label=""
                      >
                        <FontAwesomeIcon icon={faThumbtack} /> {post.pinned}
                      </span>
                      <span
                        className="like-button"
                        onClick={() => handleLike(post.id, false)}
                        role="button"
                        aria-label="thumbs up"
                      >
                         <FontAwesomeIcon icon={faHeart} /> {post.likes}
                      </span>
                      <span
                        className="reply-button"
                        onClick={() => handleToggleReplies(post.id)}
                        role="button"
                        aria-label="Reply"
                      >
                         <FontAwesomeIcon icon={faReply} /> 
                      </span>
                    </div>
                    {showReplies[post.id] && (
                      <>
                        <ul className="replies">
                          {post.replies.map((reply) => (
                            <li key={reply.id} className={`reply ${reply.pinned ? 'pinned' : ''}`}>
                              <div>
                                <strong>{reply.user}:</strong> {parseMentions(reply.content)}
                                <span
                                  className="pin-button"
                                  onClick={() => handlePinReply(post.id, reply.id)}
                                  role="button"
                                  aria-label="Pin"
                                >
                                <FontAwesomeIcon icon={faThumbtack} /> {reply.pinned}
                                </span>
                                <span
                                  className="like-button"
                                  onClick={() => handleLike(post.id, true, reply.id)}
                                  role="button"
                                  aria-label="thumbs up"
                                >
                                <FontAwesomeIcon icon={faHeart} /> {reply.likes}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleReplySubmit(post.id, reply[post.id] || '');
                          }}
                        >
                          <textarea
                            value={reply[post.id] || ''}
                            onChange={(e) =>
                              setReply({ ...reply, [post.id]: e.target.value })
                            }
                            placeholder="Write a reply..."
                          />
                          <button type="submit">Reply</button>
                        </form>
                      </>
                    )}
                  </li>
                ))}
            </ul>
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write a new post..."
              />
              <button type="submit">Post</button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading forum details...</p>
      )}
     
    </div>
  );
};

export default ForumDetailComponent;
