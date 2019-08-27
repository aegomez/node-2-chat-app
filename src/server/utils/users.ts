class Users {
  public users: chatApp.User[] = [];
  constructor() {}
  addUser(id: string, name: string, room: string) {
    let user: chatApp.User = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id: string) {
    let result = this.getUser(id);
    if (result) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return result;
  }
  getUser(id: string) {
    return this.users.find(user => user.id === id);
  }
  getUserList(room: string) {
    let result = this.users.filter(user => user.room === room);
    return result.map(user => user.name);
  }
}

export { Users };