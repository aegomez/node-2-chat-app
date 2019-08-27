import expect = require('expect');

import { Users } from './users';

describe('Users', () => {
  let users: Users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Cat videos'
      },
      {
        id: '2',
        name: 'Sully',
        room: 'Cat videos'
      },
      {
        id: '3',
        name: 'Randall',
        room: 'Dog videos'
      }
    ];
  });

  it('should add new user', () => {
    let test = {
      id: '4',
      name: 'Boo',
      room: 'Monster videos'
    };
    let addedUser = users.addUser(test.id, test.name, test.room);
    expect(users.users[3]).toEqual(test);
  });

  it('should remove a user', () => {
    let userId = '1';
    let result = users.removeUser(userId);
    expect((result as chatApp.User).id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should NOT remove a user', () => {
    let userId = '99';
    let result = users.removeUser(userId);
    expect(result).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let userId = '2';
    let result = users.getUser(userId);
    expect((result as chatApp.User).id).toBe(userId);
  });

  it('should NOT find user', () => {
    let userId = '99';
    let result = users.getUser(userId);
    expect(result).toNotExist();
  });
  
  it ('should return names for room 1', () => {
    let userList = users.getUserList('Cat videos');
    expect(userList).toEqual(['Mike', 'Sully']);
  });

  it ('should return names for room 2', () => {
    let userList = users.getUserList('Dog videos');
    expect(userList).toEqual(['Randall']);
  });
});