
const imageExt = '.png, .jpg, .jpeg'

export { imageExt }

export function isMobile(screenWidth) {
    const lg = 1024
    return screenWidth < lg 
}