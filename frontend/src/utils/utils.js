
export const sortReverse = (messages) => {
    
    let sortedDate = messages.sort(function(a,b){
        return new Date(a.date) - new Date(b.date) ;
      });
      return sortedDate
}