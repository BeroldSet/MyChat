
export const sortReverse = (messages) => {
    
    let sortedDate = messages.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date) ;
      });
      return sortedDate
}