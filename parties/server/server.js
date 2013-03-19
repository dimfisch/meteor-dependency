// All Tomorrow's Parties -- server

Meteor.publish("parties", function () {
  return Parties.find({$or: [{'public': true}, {'invited': this.userId}, {'owner': this.userId}]});
});

Meteor.publish("directory", function () {
  var users = [];
  var parties = Parties.find({$or: [{'public': true}, {'invited': this.userId}, {'owner': this.userId}]}, {fields: {'owner': 1, 'invited': 1}});

  parties.map(function (party) {
    users.push(party.owner);
    users = users.concat(party.invited);
  });
  //parties.rewind();

  return Meteor.users.find({_id: {$in: users}}, {fields: {'emails': 1, 'profile': 1}});
});
