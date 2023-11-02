import {database, storage} from "@/firebase/firebase";

async function getPostAll(func) {
  const db = database.ref("posts");
  await db.on('value', (snapshot) => {
    func(snapshot.val())
  })
}
async function getPostAllOnce() {
  const db = database.ref("posts");
  const result = await db.get()
  return result.val()
}
async function getUser(userId) {
  const db = database.ref("users/"+userId);
  const result = await db.get()
  return result.val()
}

async function createUser({ data,uid }) {
  const result = await database
  .ref('users/'+uid)
  .set(data)
  .catch((error) => {
    return(error)
  })
  return result
}

async function getUstad(ustadId) {
  const db = database.ref("ustads/"+ustadId);
  const result = await db.get()
  return result.val()
}
async function getAllUstad() {
  const db = database.ref("ustads");
  let result = await db.get()
  result = result.val()
  const array = [];

  Object.keys(result).forEach((key) => {
  array.push(result[key]);
});
  return array
}

async function getImage(imageId) {
  const result = await storage
  .ref('kajian/post/'+imageId)
  .getDownloadURL()
  .catch((error) => {
    return error
  })
  return result
}
async function insertImagePost({data,filename}) {
  const result = await storage
  .ref('kajian/post/'+filename)
  .put(data)
  .catch((error) => {
    return error
  })
  return result
}

async function insertPost({data}) {
  const result = await database
  .ref('posts')
  .push(data)
  .catch((error) => {
    return(error)
  })
  return result
}

async function updateLikeContent({ data,id }) {
  const result = await database
  .ref('posts/'+id)
  .update(data)
  .catch((error) => {
    return(error)
  })
  return result
}
async function updateCommentContent({ data,id }) {
  const result = await database
    .ref('posts/' + id)
  .update(data)
  .catch((error) => {
    return(error)
  })
  return result
}

async function getCommentPost({data,func,emptyFunc}) {
  const db = database.ref("comment").child(data);
  await db.on('value', async (snapshot) => {
    let result = []
    let user = []
    snapshot.exists() ?
    await snapshot.forEach(function (value) {
       result.push({ ...value.val() })
      database.ref("users").child(value.val().user).get().then((userResponse) => {
         user.push(userResponse.val())
         if (user.length == result.length) {
           for (let i in result) {
             result[i]['name'] = user[i].name
           }
           func(result)
         }
      })
    }) : emptyFunc()
  })
  return 'finish'
}

async function postComment({ data,id }) {
  let result = await database
  .ref('comment/'+id)
  .push(data)
  .catch((error) => {
    return(error)
  })
  const commentCounter = await database.ref("posts").child(id+'/comment').get()
  const commentData = {
    comment: commentCounter.val() + 1
  }
  result = await updateCommentContent({data:commentData,id})
  return result
}

async function getLikedCounterPost({ id, func }) {
  await database.ref('posts/' + id + '/like/count').on('value', (snapshot) => {
    func(snapshot.val())
  })
}
async function getCommentCounterPost({ id, func }) {
  await database.ref('posts/' + id + '/comment').on('value', (snapshot) => {
    func(snapshot.val())
  })
}

export {getPostAll,getPostAllOnce,getUser,getUstad,getImage,getAllUstad,insertPost,insertImagePost,createUser,updateLikeContent,getCommentPost,postComment,getLikedCounterPost,getCommentCounterPost}
