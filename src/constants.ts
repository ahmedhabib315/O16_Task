export const CONSTANTS = {
  jwtRegisterOptions: {
    secret: 'test',
    signOptions: {
      expiresIn: '1h'
    }
  },
  exceptionMessages:{
    createPost: 'You donot have access rights to Create a post',
    getPosts: 'Please login to see Posts List',
    updatePosts: 'You do not have access to Update this post',
    deletePosts: 'You do not have access to Delete this post',
    emailExists: 'Email Address already in use',
    credentialsError: 'Please login with correct Credetials'
  }
}