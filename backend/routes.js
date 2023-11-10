const pool = require('./db');
const { getResponse } = require('./getResponseGPT');

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

    // Get a list of all items avaliable (menu)
    app.get('/item', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM `db`.`MealItems`', function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

     // Get an item by id
     app.get('/item/:id', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM `db`.`MealItems` where id = ?',[req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

     // Get a list of all chats associated with a user;
     app.get('/user/chat/:id', (req, res) => {
      let user_id = req.params.id;
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT DISTINCT chat_id FROM Chats WHERE user_id = ?', [user_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

     // Create a new chat
     app.post('/chat', (req, res) => {
      let user_id = req.body.user_id;
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          console.log(user_id);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('INSERT INTO Chats(chat_name, user_id) VALUES (?,?)', ['chat-name', user_id], function (err, rowsChat, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              let chat_id = rowsChat.insertId;
              let initialMessages = [[chat_id, 1, 'system', 'You are a virtual waiter, you give around 50 word replies and, and its critical that You always call the getItem function when recommending any food items or full course meals', false],
                                      [chat_id, 1, 'assistant', 'I am your virtual Ordering assistance, let me know what your craving so i can give you my best recommendations!', false]]
              connection.query('iNSERT INTO Messages(chat_id, sender_id, sender_role, message_content, function_call) VALUES ?', [initialMessages], function (err, rows, fields) {  
                if (err) {
                  logger.error("Error Creating first system message: \n", err);
                  res.status(400).json({
                    "data": [],
                    "error": "Error Creating first system message"
                  })
                } else {
                  connection.query('INSERT INTO Carts (chat_id) VALUES (?)', [chat_id], function (err, rows, fields) {  
                    if (err) {
                      logger.error("Error Creating Cart for Chat: \n", err);
                      res.status(400).json({
                        "data": [],
                        "error": "Error Creating cart for chat"
                      })
                    } else {
                      res.status(200).json({
                        "message-data": rows,
                        "chat-data": rowsChat
                      });
                    }
                  });
                }
              });
            }

          });
        }
      });
    });
     // Get all messages associated with a chat_id
     app.get('/chat/:id', (req, res) => {
      let chat_id = req.params.id;
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM Messages WHERE chat_id = ? ORDER BY sent_at', [chat_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

    // Get all items in a cart, by chat_id
    app.get('/cart/:id', (req, res) => {
      let chat_id = req.params.id;
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT MI.*, COUNT(CI.meal_item_id) AS quantity FROM MealItems MI JOIN CartItems CI ON MI.ID = CI.meal_item_id JOIN Carts C ON CI.cart_id = C.cart_id WHERE C.chat_id = ? GROUP BY MI.ID', [chat_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error Getting item from cart"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

    // Add new item to cart
    app.post('/cart/:id', (req, res) => {
      let chat_id = req.params.id;
      let item_id = req.body.item_id;
      console.log('Cart_id: ' +chat_id+'item_id'+item_id);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('INSERT INTO CartItems (cart_id, meal_item_id) SELECT cart_id, ? FROM Carts WHERE chat_id = ?', [item_id, chat_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error Add new item to cart"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

    //Remove item from cart
    app.delete('/cart/:id', (req, res) => {
      let chat_id = req.params.id;
      let item_id = req.body.item_id;
      console.log('Cart_id: ' +chat_id+'item_id'+item_id);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('DELETE CI FROM CartItems CI JOIN Carts C ON CI.cart_id = C.cart_id WHERE C.chat_id = ? AND CI.meal_item_id = ?', [chat_id, item_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error Add new item to cart"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });

    // Handle new messages from user 
    app.post('/message', async (req, res) => {
      let message = req.body.data;
      let newMessages;
      try {
        newMessages = await getResponse(message);
      } catch (error) {
        console.log(error);
        res.status(400).json({
          "data": [],
          "error": error
        })
        return;
      }
      
      //console.log(newMessages);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          sql ='INSERT INTO Messages(chat_id, sender_id, sender_role, message_content, function_call,function_arg) VALUES ?';
          message_array = newMessages.map(message => [message.chat_id, message.user_id, message.sender_role, message.message_content, message.function_call,message.function_arg])

          console.log(message_array);
          connection.query(sql, [message_array], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error adding new message"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    });


}