// Modelo de la clase usuario_seguidor
export default class UserFollower {

    constructor(id, user, follower, date, stopFollowing) {
      this.id = id;
      this.user = user;
      this.follower = follower;
      this.date = date;
      this.stopFollowing = stopFollowing;
    }
  
  }