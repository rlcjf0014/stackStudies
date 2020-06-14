const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList,

} = graphql;


let books = [
  {name: 'Oliver Twist', genre: 'Boring', id: '1', authorId: '1'},
  {name: 'IzOne', genre: 'Kpop', id: '2', authorId: '2'},
  {name: 'MineralWater', genre: 'water', id: '3', authorId: '3'},
  {name: 'Great Expectations', genre: 'boring', id: '4', authorId: '4'},
  {name: 'Chicken', genre: 'delicioso', id: '5', authorId: '1'}
];

let authors = [
  {name: 'Joshua Song', age: 24, id: '1'},
  {name: 'David Song', age: 19, id: '2'},
  {name: 'Sunny Kim', age: 50, id: '3'},
  {name: 'James Song', age: 54, id: '4'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId})
      }
    }
  }) 
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  }) 
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType', 
  fields: {
    book: {
      type: BookType,
      args: { id: {type:GraphQLID}},
      resolve(parent, args){
        console.log(typeof (args.id))
        return _.find(books, {id: args.id});
        //code to get data from db / other source
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id})
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})