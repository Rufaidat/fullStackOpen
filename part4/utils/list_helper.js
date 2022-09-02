const dummy = (array) => {
  return 1;
};

const likesSum = (array) => {
  const likes = [];
  for (let i = 0; i < array.length; i++) {
    likes.push(array[i].likes);
  }
  return likes.length === 0
    ? 0
    : likes.reduce((sum, item) => {
        return (sum += item);
      });
};

const favoriteBlog = (array) => {
  let max = 0;
  let index;

  for (let i = 0; i < array.length; i++) {
    if (array[i].likes > max) {
      max = array[i].likes;
      index = i;
    }
  }
  let favorite = array[index];
  const result = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
  return result;
};

module.exports = {
  dummy,
  likesSum,
  favoriteBlog,
};
