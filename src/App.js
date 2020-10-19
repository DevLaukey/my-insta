import React, { useEffect, useState } from 'react';
import db from './firebase'
import auth from './firebase'
import './App.css';
import Post from './Post';
import { Button, Input } from '@material-ui/core';
import Modal from 'react-modal'
import ImageUpload from './ImageUpload';


Modal.setAppElement('#root')
function App() {

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false)



  const signUp = (e) => {
    e.preventDefault()

    auth.auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username

      })
    }).catch((error) => alert(error.message))
    setModaIsOpen(false)
  }


  const signIn = (e) => {
    e.preventDefault()
    auth.auth.
      signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  useEffect(() => {
    const unsubscribe = auth.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser)

      } else {
        setUser(null)
      }
    })

    return () => {
      // prevent clogging
      unsubscribe();
    }
  }, [user, username])



  useEffect(() => {
    db.db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  const [modalIsopen, setModaIsOpen] = useState(false)
  return (
    <div className="app container">


      {!user?.displayName ? (

        <ImageUpload key="imgupload" username={user?.displayName} />
      ) : (
          <h1>Kindly Login To post</h1>
        )}


      <Modal className="" isOpen={modalIsopen} onRequestClose={() => setModaIsOpen(false)}
        style={{
          overlay: { opacity: "0.9", backgroundColor: "grey" },
          content: {
            color: 'black',
          }
        }}>
        <Button onClick={() => setModaIsOpen(false)}> <strong>CLOSE MODAL</strong> </Button>
        <div className="modal_content container">
          <form className="app_signup">
            <center>
              <img className="app_headerimg" src="https://i.ibb.co/Ss9stCF/logo.webp" alt="" />
              <Input
                placeholder="username"
                type="text"

                value={username}
                className="container-fluid "
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                className="container-fluid "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                className="container-fluid "
                value={password}

                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="container" onClick={signUp} type="submit">Sign up</Button>
            </center>

          </form>

        </div>

      </Modal>
      <Modal className="" isOpen={openSignIn} onRequestClose={() => setOpenSignIn(false)}
        style={{
          overlay: { opacity: "0.9", backgroundColor: "grey" },
          content: {
            color: 'black',
          }
        }}>
        <Button onClick={() => setOpenSignIn(false)}> <strong>CLOSE MODAL</strong> </Button>
        <div className="modal_content container">
          <form className="app_signup">
            <center>
              <img className="app_headerimg" src="https://i.ibb.co/Ss9stCF/logo.webp" alt="" />

              <Input
                placeholder="email"
                type="text"
                className="container-fluid "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                className="container-fluid "
                value={password}

                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="container" onClick={signIn} type="submit">Sign In</Button>
            </center>

          </form>

        </div>

      </Modal>
      <div className="app_header jumbotron">
        <img
          className="app_headerimg"
          src="https://i.ibb.co/Ss9stCF/logo.webp" alt="" />
      </div>
      {user ? (

        <Button onClick={() => auth.auth.signOut()}>
          Log Out
        </Button>
      ) : (
          <div className="app_loginContainer container" >
            <Button onClick={() => setOpenSignIn(true)}>
              Sign In
          </Button>
            <Button onClick={() => setModaIsOpen(true)}>
              SignUp
          </Button>
          </div>

        )}
      {
        posts.map(({ id, post }) => (
          <Post key="posts" username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div >
  );
}

export default App;
