import {database, storage} from "@/firebase/firebase";

async function getPostAll() {
  const db = database.ref("posts");
  const result = await db.on('value', () => {
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

export {getPostAll,getPostAllTest,getUser,getUstad,getImage,getAllUstad,insertPost,insertImagePost,createUser}
