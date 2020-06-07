const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema} = graphql;


let books = [
  {name: 'Oliver Twist', genre: 'Boring', id: '1'},
  {name: 'IzOne', genre: 'Kpop', id: '2'},
  {name: 'MineralWater', genre: 'water', id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  }) 
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType', 
  fields: {
    book: {
      type: BookType,
      args: { id: {type:GraphQLString}},
      resolve(parent, args){
        return _.find(books, {id: args.id});
        //code to get data from db / other source
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})