/**
 * @Author: moalsabih
 * @Date:   25-10-2017
 * @Project: GACA - PERMITS
 * @Last modified by:   moalsabih
 * @Last modified time: 25-10-2017
 */


 import { THROW_ERROR, RESET_ERROR_MESSAGE } from '../constants/ErrorConstants'

 export const doThrowError = (error) => {
   return {
     type: THROW_ERROR,
     error
   }
 }

 export const doResetError = () => {
   return {
     type: RESET_ERROR_MESSAGE
   }
 }
