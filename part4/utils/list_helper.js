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

const listWithMany = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

const mostBlogs = (listWithMany) => {
    const list2 = Array.from(new Set(arr.map((n) => n.author)));
  
    const ans = list2.map((n) => {
      const length = arr.filter((m) => m.author === n).length;
      return { author: n, blogs: length };
    });
    let most;
    let num = 0;
    for (let i = 0; i < ans.length; i++) {
      if (ans[i].blogs > num) {
        num = ans[i].blogs;
        most = ans[i];
      }
    }
  
    return most;
  
};

module.exports = {
  dummy,
  likesSum,
  favoriteBlog,
};
