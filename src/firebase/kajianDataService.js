import {database, storage} from "@/firebase/firebase";


// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

// const dbRef = firebase.database().ref();
// dbRef.child("users").child(userId).get().then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

async function getPostAll() {
  const db = database.ref("posts");
  const result = await db.on('value', (test) => {
  })
  return result.val()
}
async function getPostAllTest() {
  const db = database.ref("posts");
  const result = await db.get()
  return result.val()
}
async function getUser(userId) {
  const db = database.ref("users/"+userId);
  const result = await db.get()
  return result.val()
}
async function getUstad(ustadId) {
  const db = database.ref("ustads/"+ustadId);
  const result = await db.get()
  return result.val()
}

async function getImage(imageId) {
  const result = await storage
  .ref('kajian/post/'+imageId)
  .getDownloadURL()
  .catch((error) => {
    console.log(error)
  })
  return result
}


export {getPostAll,getPostAllTest,getUser,getUstad,getImage}
// class quizDataService {
//   getAll() {
//     return db;
//   }

//   create(tutorial) {
//     return db.push(tutorial);
//   }

//   update(key, value) {
//     return db.child(key).update(value);
//   }

//   delete(key) {
//     return db.child(key).remove();
//   }

//   deleteAll() {
//     return db.remove();
//   }
// }

// export default new quizDataService();