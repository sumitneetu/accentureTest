/**
 * In future 
 * this file stand for flexibility to customized or add functionality to config
 * or when we change the way to get config from another way like. no need to use next/config anymore
 * you can change in here and no need to change a file and import config.
 * 
 * when we need to add toggle feature
 * exp : toggle feature or schedule features in our application
 * toggle: () => {  return true }
 * 
 */
import getConfig from 'next/config'

export const { publicRuntimeConfig: appConfig } = getConfig()

// example if we need toggle configuratin in future. you can use appConfig value also
// export const appToggle = () => {
//     return {
//         toggleXxxFeature: true,
//         toggleYyyFeature: () => {
//             // - schedule 
//             // - condition
//         } 
//     }
// }
