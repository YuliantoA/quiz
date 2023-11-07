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

async function getAndCheckUserPhoto({ uid }) {
  const db = database.ref("users/"+uid);
  let result = await db.get()
  if (result.val().imageExt) {
    result = await storage
    .ref('kajian/user/'+uid+'.'+result.val().imageExt)
    .getDownloadURL()
    .catch((error) => {
      return error
    })
    return result
  }  else
  return null
}

async function getUserPhoto(userId) {
  const result = await storage
  .ref('kajian/user/'+userId)
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
async function insertImageUser({ data, filename }) {
  const imgExt = filename.split('.')[1]
  const uid = filename.split('.')[0]
  let result = await storage
  .ref('kajian/user/'+filename)
  .put(data)
  .catch((error) => {
    return error
  })
  await database
  .ref('users/'+uid)
     .update({ imageExt: imgExt }, (error) => {
       if (error) {
         result = false
       } else {
         result = true
    }
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

async function updateLikeContent({ data,id,statusLike }) {
  let result = await database
  .ref('like/'+id+'/count')
  .set(data.count)
  .catch((error) => {
    return(error)
  })
  statusLike ?
  result = await database
    .ref('like/' + id + '/user')
    .child(Object.keys(data.user)[0]).set(true)
  .catch((error) => {
    return(error)
  }) :
  result = await database
    .ref('like/' + id + '/user/'+Object.keys(data.user)[0])
    .remove()
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
  const db = database.ref("comment").child(data).orderByKey();
  await db.on('value', async (snapshot) => {
    let result = []
    let user = []
    snapshot.exists() ?
      await snapshot.forEach(function (value) {
      // console.log(value.key())
       result.push({ ...value.val() })
      database.ref("users").child(value.val().user).get().then((userResponse) => {
         user.push(userResponse.val())
         if (user.length == result.length) {
           for (let i in result) {
             result[i]['name'] = user[i].name
           }
           result = result.reverse()
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
  await database.ref('like/' + id + '/count').on('value', (snapshot) => {
    func(snapshot.val() ? snapshot.val() : 0)
  })
}

async function getDetailLikedPost({ id }) {
  const db = database.ref("like/"+id+'/user');
  const result = await db.get()
  return result.val()
}

async function getCommentCounterPost({ id, func }) {
  await database.ref('posts/' + id + '/comment').on('value', (snapshot) => {
    func(snapshot.val() ? snapshot.val() : 0)
  })
}

async function getCountPost(uid) {
  const db = database.ref("posts");
  let result = 0
  const snapshot = await db.get()
  snapshot.forEach((child) => {
    Object.keys(child.val().creator)[0] === uid ? result++ :''
  })
  return result
}
async function getCountLikedPost(uid) {
  const db = database.ref("like");
  let result = 0
  const snapshot = await db.get()
  snapshot.forEach((child) => {
    child.val().user ? 
    child.val().user[uid] ? result++ : ''
 : ''
  })
  return result
}

export {
  getPostAll, getPostAllOnce, getUser, getUstad, getImage, getAllUstad, insertPost,
  insertImagePost, createUser, updateLikeContent, getCommentPost, postComment, getLikedCounterPost, getCommentCounterPost,
  insertImageUser,getUserPhoto,getCountPost,getCountLikedPost,getDetailLikedPost,getAndCheckUserPhoto
}
