import Compress from 'compress.js'

export async function compressImage(image) {
  
const compress = new Compress()
  const compressedImage = await compress.compress(image, {
    size: 2, // the max size in MB, defaults to 2MB
    quality: 0.75, // the quality of the image, max is 1,
    maxWidth: 1920, // the max width of the output image, defaults to 1920px
    maxHeight: 1920, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
    rotate: false // See the rotation section below
  })
    const file = Compress.convertBase64ToFile(
        compressedImage[0].data,
       compressedImage[0].alt.split('.')[1]
        )
        return file
}