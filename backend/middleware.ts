const sendmail = require('sendmail')();
const path = require('path'); // used for file path
const fs = require('fs-extra');

module.exports = (req, res, next) => {
  const {
    app: { db },
    query,
  } = req;

  // prevent from caching database.json file
  // this is different from nocache(), which prevents 304 status codes
  db.assign(require('import-fresh')('./data/database.json')).write();

  if (req.method === 'POST' && req.path === '/upload') {
    const cardId = req.query.card;

    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
      fstream = fs.createWriteStream(`${__dirname}/data/uploaded/${cardId}_${filename}`);
      file.pipe(fstream);
      fstream.on('close', () => {
        const currentCard = db
          .get('cards')
          .find({ id: Number(query.card) })
          .value();

        currentCard.file = `${cardId}_${filename}`;

        db.get('cards')
          .find({ id: Number(query.card) })
          .write(currentCard);

        res.status(200).jsonp(currentCard);
      });
    });

    return;
  }

  if (req.method === 'POST' && req.path === '/welcomeemail') {
    // send welcome email if header is true
    sendmail({}, function (err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    });

    let response = res.status(201).jsonp(req.body);
    return response;
  }

  next();
};
