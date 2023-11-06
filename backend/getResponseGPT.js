const { Configuration, OpenAI } = require("openai");
const pool = require('./db');
const apiKey = "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";
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

const functions = [
    {
      "name": "getItem",
      "description": "Suggest a Menu Item from the given menu:",
      "parameters": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "The menu id of the recommended dish."
          }
        },
        "required": ["id"]
      }
    }
  ]


module.exports.getResponse = async (message) => {
    try{
        const openai = new OpenAI({
            apiKey: apiKey 
          });
      let shouldContinue = true;
      let chat_id = message.chat_id;
      let user_id = message.user_id;
      let currentConversation = [];
      let conversationHistory = [
        {role: "system", content:`Current menu: 
        {
            "id" : 1,
            "Name" : "CRUNCHY ONION RINGS",
            "Description" : "Served with Honey BBQ Sauce."
        },
        {
            "id" : 2,
            "Name" : "SPINACH & ARTICHOKE DIP",
            "Description" : "Creamy spinach and artichoke dip topped with Parmesan cheese. Served with freshly made white corn tortilla chips and our chipotle lime salsa."
        },
        {
            "id" : 3,
            "Name" : "CHICKEN WONTON TACOS",
            "Description" : "Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro."
        },
        {
            "id" : 4,
            "Name" : "CHICKEN QUESADILLA",
            "Description" : "Warm, grilled tortillas are loaded with chipotle lime chicken, house-made pico de gallo and a blend of melted Cheddar cheeses. Served with our chipotle lime salsa and sour cream."
        },
        {
            "id" : 5,
            "Name" : "NEIGHBORHOOD NACHOS WITH CHIPOTLE LIME CHICKEN",
            "Description" : "Freshly made white corn tortilla chips are topped with grilled chicken, queso blanco, a blend of melted Cheddar cheeses, house-made pico de gallo, fresh jalapeños, chopped cilantro, sour cream and guacamole."
        },
        {
            "id" : 6,
            "Name" : "APPLEBEE'S® RIBLETS PLATTER",
            "Description" : "An Applebee’s original! Our famous slow cooked riblets, slathered in your choice of sauce. Pictured with signature coleslaw and fries."
        },
        {
            "id" : 7,
            "Name" : "8 OZ. TOP SIRLOIN",
            "Description" : "Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides."
        },
        {
            "id" : 8,
            "Name" : "BOURBON STREET STEAK",
            "Description" : "Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides."
        },
        {
            "id" : 9,
            "Name" : "SHRIMP 'N PARMESAN SIRLOIN",
            "Description" : "A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides."
        },
        {
            "id" : 10,
            "Name" : "CHICKEN TENDERS PLATTER",
            "Description" : "Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries."
        },
        {
            "id" : 11,
            "Name" : "FIESTA LIME CHICKEN",
            "Description" : "A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo."
        },
        {
            "id" : 12,
            "Name" : "GRILLED CHICKEN BREAST",
            "Description" : "Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli."
        },
        {
            "id" : 13,
            "Name" : "BOURBON STREET CHICKEN & SHRIMP",
            "Description" : "Update Bourbon Street Chicken & Shrimp copy (PRINT ONLY) to “Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes."
        },
        {
            "id" : 14,
            "Name" : "HAND-BATTERED FISH & CHIPS",
            "Description" : "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."
        },
        {
            "id" : 15,
            "Name" : "BLACKENED CAJUN SALMON",
            "Description" : "6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli."
        },
        {
            "id" : 16,
            "Name" : "DOUBLE CRUNCH SHRIMP",
            "Description" : "Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries."
        },
        {
            "id" : 17,
            "Name" : "CLASSIC BROCCOLI CHICKEN ALFREDO",
            "Description" : "Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 18,
            "Name" : "THREE-CHEESE CHICKEN PENNE",
            "Description" : "Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes."
        },
        {
            "id" : 19,
            "Name" : "FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS",
            "Description" : "A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.)"
        },
        {
            "id" : 20,
            "Name" : "SOUTHWEST CHICKEN BOWL",
            "Description" : "Grilled chipotle lime chicken on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge."
        },
        {
            "id" : 21,
            "Name" : "TEX-MEX SHRIMP BOWL",
            "Description" : "Grilled chipotle lime shrimp on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge."
        },
        {
            "id" : 22,
            "Name" : "ORIENTAL CHICKEN SALAD",
            "Description" : "A long-running favorite, crispy breaded chicken tenders top a bed of Asian greens, crunchy noodles and almonds with our Oriental vinaigrette on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 23,
            "Name" : "GRILLED CHICKEN TENDER SALAD",
            "Description" : "A hearty salad with juicy grilled chicken on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 24,
            "Name" : "CRISPY CHICKEN TENDER SALAD",
            "Description" : "A hearty salad with crispy chicken tenders on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 25,
            "Name" : "BLACKENED SHRIMP CAESAR SALAD",
            "Description" : "Crisp romaine topped with blackened shrimp, croutons, shaved Parmesan and garlic Caesar dressing on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 26,
            "Name" : "NEIGHBORHOOD BURGER",
            "Description" : "A neighborhood classic. Two juicy, all-beef 3.5 oz. patties are seared and stacked with American cheese and smothered with house-made garlic mayo. Served with shredded lettuce and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 27,
            "Name" : "QUESADILLA BURGER",
            "Description" : "Part burger, part quesadilla, all taste. This original burger creation comes piled high with two slices of Pepper Jack cheese, our signature Mexi-ranch sauce, crispy Applewood-smoked bacon, house-made Pico de Gallo and shredded lettuce in a crisp, warm Cheddar quesadilla. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 28,
            "Name" : "CLASSIC BACON CHEESEBURGER",
            "Description" : "Our juicy all-beef patty topped with two slices of American Cheese and two strips of Applewood-smoked bacon. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 29,
            "Name" : "CLASSIC CHEESEBURGER",
            "Description" : "Our handcrafted all-beef patty topped with two slices of American cheese. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 30,
            "Name" : "THE PRIME RIB DIPPER",
            "Description" : "Thinly sliced prime rib topped with grilled onions and melted American cheese. Served on a toasted Cheddar roll with our house-made herb mayo and French onion Au jus for delectable dipping. Pictured with classic fries."
        },
        {
            "id" : 31,
            "Name" : "CHICKEN FAJITA ROLLUP",
            "Description" : "Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries."
        },
        {
            "id" : 32,
            "Name" : "CLUBHOUSE GRILLE",
            "Description" : "Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries."
        },
        {
            "id" : 33,
            "Name" : "TRIPLE CHOCOLATE MELTDOWN",
            "Description" : "Warm, rich, fudge-filled chocolate cake drizzled with hot fudge. Served with vanilla ice cream."
        },
        {
            "id" : 34,
            "Name" : "BROWNIE BITE",
            "Description" : "The perfect size of a warm dark chocolate brownie with nuts. Served with vanilla ice cream and drizzled with hot fudge."
        },
        {
            "id" : 35,
            "Name" : "SIZZLIN' BUTTER PECAN BLONDIE",
            "Description" : "Our famous blondie is sizzled and drizzled with maple cream cheese sauce, then topped with vanilla ice cream and candied pecans."
        },
        {
            "id" : 36,
            "Name" : "THE CLASSIC COMBO",
            "Description" : "All the classic apps you love - Boneless Wings, Spinach & Artichoke Dip, Chicken Quesadilla and Mozzarella Sticks."
        },
        {
            "id" : 37,
            "Name" : "CHICKEN WONTON TACOS",
            "Description" : "Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro."
        }    
 `}];
    //build conversationHistory from db call
    
    //get messages from db
    function getMessages() {
        return new Promise((resolve, reject) => {
            pool.getConnection(async function (err, connection){
                if(err){
                  // if there is an issue obtaining a connection, release the connection instance and log the error
                  console.log('Problem obtaining MySQL connection',err)
                } else {
                  // if there is no issue obtaining a connection, execute query and release connection
                    connection.query('SELECT * FROM Messages WHERE chat_id = ? ORDER BY sent_at', [chat_id], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                      console.log("Error while fetching values: \n", err);
                    } else {
                      resolve(rows);
                    }
                  });
                }
              });
        });
      }
    console.log('Getting messages from db');
    let messages_rows = await getMessages();
    //console.log(messages_rows);
    //add messages to the conversation History
    messages_rows.map(row => {
        conversationHistory.push({role:row.sender_role, content:row.message_content})
    })

    //Add the new message to the current conversation
    conversationHistory.push({role: "user", "content": message.message_content})
    currentConversation.push({role: "user", "content": message.message_content})

    //conversationHistory.forEach(obj => console.log(obj));
    console.log('Running conversation with GPT');
     while (shouldContinue) {
      try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: conversationHistory,
            functions: functions,
            function_call: "auto",  // auto is default, but we'll be explicit
            temperature:0.2
        });
        
        console.log('Received response from GPT');
        console.log(response);
        const gptResponse = response.choices[0].message;
        console.log(response.choices[0]);
        // Handle function calls
        if (gptResponse.function_call) {
          const functionDetails = gptResponse.function_call;
          const functionName = functionDetails.name;
          const functionArgs = JSON.parse(functionDetails.arguments);

          // Simulate the function call using the provided function name and arguments
          const functionResult = simulateFunctionCall(functionName, functionArgs, menuData);

            console.log('Function'+ functionResult);
          // Add the result of the function call to the conversation history
          conversationHistory.push({
            "role": "system",
            "name": "getItem",
            "content": 'getItem(' +functionArgs.id+') called resulting in:' + JSON.stringify(functionResult),
          });

          currentConversation.push({
            "role": "system",
            "content": 'getItem(' +functionArgs.id+') called resulting in:' + JSON.stringify(functionResult),
            "function_arg": functionArgs.id
          });
          
        } else {
          // Regular message handling
          conversationHistory.push(gptResponse);
          currentConversation.push(gptResponse);
        }
  
        // Determine if we should continue the conversation
        if(response.choices[0].finish_reason === 'stop'){
            shouldContinue=false;
        }
        
      } catch (error) {
        console.error('Error during API call:', error);
        shouldContinue = false;
        return;
      }
    }
    console.log('currentConversation:', currentConversation.map(obj => JSON.stringify(obj)));
    let processedResponses = processResponsesForDb(currentConversation, chat_id, user_id);
    console.log("Messages to add to db:"+ processedResponses);

    //store the new messages in the db.
    return processedResponses;
    } catch (error) {
        console.error(error);
      }
  };
  const processResponsesForDb = (responses, chat_id, user_id) => {
    let messagesP = [];
    responses.map(response=> {
        if(response.function_arg) {
            messagesP.push({"chat_id": chat_id, "user_id":1, "sender_role": response.role, "message_content":response.content, "function_call": true, "function_arg":response.function_arg})
        } else {
            messagesP.push({"chat_id": chat_id, "user_id":user_id, "sender_role": response.role, "message_content":response.content, "function_call": false})
        }
    })
    return messagesP;
    // Add more functions as needed
  };

  const simulateFunctionCall = (functionName, args, menuData) => {
        if( Number.isInteger(args.id)){
            return menuData[args.id]
        }
        return menuData[0]

  };
 const menuData = [
        {id: 0, name: "Nothing", description: "nothing"},
        {
            "id" : 1,
            "Name" : "CRUNCHY ONION RINGS",
            "Description" : "Served with Honey BBQ Sauce."
        },
        {
            "id" : 2,
            "Name" : "SPINACH & ARTICHOKE DIP",
            "Description" : "Creamy spinach and artichoke dip topped with Parmesan cheese. Served with freshly made white corn tortilla chips and our chipotle lime salsa."
        },
        {
            "id" : 3,
            "Name" : "CHICKEN WONTON TACOS",
            "Description" : "Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro."
        },
        {
            "id" : 4,
            "Name" : "CHICKEN QUESADILLA",
            "Description" : "Warm, grilled tortillas are loaded with chipotle lime chicken, house-made pico de gallo and a blend of melted Cheddar cheeses. Served with our chipotle lime salsa and sour cream."
        },
        {
            "id" : 5,
            "Name" : "NEIGHBORHOOD NACHOS WITH CHIPOTLE LIME CHICKEN",
            "Description" : "Freshly made white corn tortilla chips are topped with grilled chicken, queso blanco, a blend of melted Cheddar cheeses, house-made pico de gallo, fresh jalapeños, chopped cilantro, sour cream and guacamole."
        },
        {
            "id" : 6,
            "Name" : "APPLEBEE'S® RIBLETS PLATTER",
            "Description" : "An Applebee’s original! Our famous slow cooked riblets, slathered in your choice of sauce. Pictured with signature coleslaw and fries."
        },
        {
            "id" : 7,
            "Name" : "8 OZ. TOP SIRLOIN",
            "Description" : "Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides."
        },
        {
            "id" : 8,
            "Name" : "BOURBON STREET STEAK",
            "Description" : "Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides."
        },
        {
            "id" : 9,
            "Name" : "SHRIMP 'N PARMESAN SIRLOIN",
            "Description" : "A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides."
        },
        {
            "id" : 10,
            "Name" : "CHICKEN TENDERS PLATTER",
            "Description" : "Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries."
        },
        {
            "id" : 11,
            "Name" : "FIESTA LIME CHICKEN",
            "Description" : "A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo."
        },
        {
            "id" : 12,
            "Name" : "GRILLED CHICKEN BREAST",
            "Description" : "Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli."
        },
        {
            "id" : 13,
            "Name" : "BOURBON STREET CHICKEN & SHRIMP",
            "Description" : "Update Bourbon Street Chicken & Shrimp copy (PRINT ONLY) to “Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes."
        },
        {
            "id" : 14,
            "Name" : "HAND-BATTERED FISH & CHIPS",
            "Description" : "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."
        },
        {
            "id" : 15,
            "Name" : "BLACKENED CAJUN SALMON",
            "Description" : "6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli."
        },
        {
            "id" : 16,
            "Name" : "DOUBLE CRUNCH SHRIMP",
            "Description" : "Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries."
        },
        {
            "id" : 17,
            "Name" : "CLASSIC BROCCOLI CHICKEN ALFREDO",
            "Description" : "Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 18,
            "Name" : "THREE-CHEESE CHICKEN PENNE",
            "Description" : "Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes."
        },
        {
            "id" : 19,
            "Name" : "FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS",
            "Description" : "A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.)"
        },
        {
            "id" : 20,
            "Name" : "SOUTHWEST CHICKEN BOWL",
            "Description" : "Grilled chipotle lime chicken on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge."
        },
        {
            "id" : 21,
            "Name" : "TEX-MEX SHRIMP BOWL",
            "Description" : "Grilled chipotle lime shrimp on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge."
        },
        {
            "id" : 22,
            "Name" : "ORIENTAL CHICKEN SALAD",
            "Description" : "A long-running favorite, crispy breaded chicken tenders top a bed of Asian greens, crunchy noodles and almonds with our Oriental vinaigrette on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 23,
            "Name" : "GRILLED CHICKEN TENDER SALAD",
            "Description" : "A hearty salad with juicy grilled chicken on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 24,
            "Name" : "CRISPY CHICKEN TENDER SALAD",
            "Description" : "A hearty salad with crispy chicken tenders on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 25,
            "Name" : "BLACKENED SHRIMP CAESAR SALAD",
            "Description" : "Crisp romaine topped with blackened shrimp, croutons, shaved Parmesan and garlic Caesar dressing on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."
        },
        {
            "id" : 26,
            "Name" : "NEIGHBORHOOD BURGER",
            "Description" : "A neighborhood classic. Two juicy, all-beef 3.5 oz. patties are seared and stacked with American cheese and smothered with house-made garlic mayo. Served with shredded lettuce and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 27,
            "Name" : "QUESADILLA BURGER",
            "Description" : "Part burger, part quesadilla, all taste. This original burger creation comes piled high with two slices of Pepper Jack cheese, our signature Mexi-ranch sauce, crispy Applewood-smoked bacon, house-made Pico de Gallo and shredded lettuce in a crisp, warm Cheddar quesadilla. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 28,
            "Name" : "CLASSIC BACON CHEESEBURGER",
            "Description" : "Our juicy all-beef patty topped with two slices of American Cheese and two strips of Applewood-smoked bacon. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 29,
            "Name" : "CLASSIC CHEESEBURGER",
            "Description" : "Our handcrafted all-beef patty topped with two slices of American cheese. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef."
        },
        {
            "id" : 30,
            "Name" : "THE PRIME RIB DIPPER",
            "Description" : "Thinly sliced prime rib topped with grilled onions and melted American cheese. Served on a toasted Cheddar roll with our house-made herb mayo and French onion Au jus for delectable dipping. Pictured with classic fries."
        },
        {
            "id" : 31,
            "Name" : "CHICKEN FAJITA ROLLUP",
            "Description" : "Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries."
        },
        {
            "id" : 32,
            "Name" : "CLUBHOUSE GRILLE",
            "Description" : "Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries."
        },
        {
            "id" : 33,
            "Name" : "TRIPLE CHOCOLATE MELTDOWN",
            "Description" : "Warm, rich, fudge-filled chocolate cake drizzled with hot fudge. Served with vanilla ice cream."
        },
        {
            "id" : 34,
            "Name" : "BROWNIE BITE",
            "Description" : "The perfect size of a warm dark chocolate brownie with nuts. Served with vanilla ice cream and drizzled with hot fudge."
        },
        {
            "id" : 35,
            "Name" : "SIZZLIN' BUTTER PECAN BLONDIE",
            "Description" : "Our famous blondie is sizzled and drizzled with maple cream cheese sauce, then topped with vanilla ice cream and candied pecans."
        },
        {
            "id" : 36,
            "Name" : "THE CLASSIC COMBO",
            "Description" : "All the classic apps you love - Boneless Wings, Spinach & Artichoke Dip, Chicken Quesadilla and Mozzarella Sticks."
        },
        {
            "id" : 37,
            "Name" : "CHICKEN WONTON TACOS",
            "Description" : "Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro."
        },
  ];


