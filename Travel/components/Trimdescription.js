const trimDescription = (description, wordlimit) => {
    const words = description.split(' ');
    if (words.length <= wordlimit) {
      return description;
    }
    return words.slice(0, wordlimit).join(' ') + '......';
  };
  

  export default trimDescription;
