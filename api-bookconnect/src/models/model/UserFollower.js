// Modelo de la clase usuario_seguidor
export default class UserFollower {

    constructor(id, startFollowing, unfollow, user, follower) {
      this.id = id;
      this.startFollowing = startFollowing;
      this.unfollow = unfollow;
      this.user = user;
      this.follower = follower;
    }
  
  }