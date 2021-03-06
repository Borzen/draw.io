var text;

if (typeof WEB === 'undefined') text = require('./text');

text['api'] = {
  'provides': {
    'text': true
  },
  'getLength': function() {
    return this.snapshot.length;
  },
  'getText': function() {
    return this.snapshot;
  },
  'insert': function(pos, text, callback) {
    var op;
    op = [
      {
        'p': pos,
        'i': text
      }
    ];
    this.submitOp(op, callback);
    return op;
  },
  'del': function(pos, length, callback) {
    var op;
    op = [
      {
        'p': pos,
        'd': this.snapshot.slice(pos, (pos + length))
      }
    ];
    this.submitOp(op, callback);
    return op;
  },
  '_register': function() {
    return this.on('remoteop', function(op) {
      var component, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = op.length; _i < _len; _i++) {
        component = op[_i];
        if (component['i'] !== void 0) {
          _results.push(this.emit('insert', component['p'], component['i']));
        } else {
          _results.push(this.emit('delete', component['p'], component['d']));
        }
      }
      return _results;
    });
  }
};
