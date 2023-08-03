 const transformArray = (list) => {

   list = list.map(item=>{
      return {
         valor: item
      }
   })
   return list;
 }

 export default transformArray;