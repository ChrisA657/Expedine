import axios from "axios"
import apiURL from "./APIURL"
import OpenAI from 'openai';
const apiKey = "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";
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}
const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // This is also the default, can be omitted
  });


const client = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
  });

 const params = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {"role": "system", "content": `You are a virtual waiter, choose a menu item by returning an id based on this menu of items :
          {id: 1, name: "The Classic Combo", description: ""},
          {id: 2, name: "HALF RACK DOUBLE-GLAZED BABY BACK RIBS", description: "Half rack of ribs slow-cooked to fall-off-the-bone tenderness. Slathered with your choice of Honey BBQ sauce or Sweet Asian chile sauce."},
          {id: 3, name: "8 OZ. TOP SIRLOIN", description: "Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides."},
          {id: 4, name: "BOURBON STREET STEAK*", description: "Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides."},
          {id: 5, name: "SHRIMP 'N PARMESAN SIRLOIN*", description: "A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides."},
          {id: 6, name: "CHICKEN TENDERS PLATTER", description: "Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries."},
          {id: 7, name: "FIESTA LIME CHICKEN", description: "A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo."},
          {id: 8, name: "GRILLED CHICKEN BREAST", description: "Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli."},
          {id: 9, name: "BOURBON STREET CHICKEN & SHRIMP", description: "Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes."},
          {id: 10, name: "DOUBLE CRUNCH SHRIMP", description: "Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries."},
          {id: 11, name: "BLACKENED CAJUN SALMON", description: "6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli."},
          {id: 12, name: "HAND-BATTERED FISH & CHIPS", description: "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."},
          {id: 13, name: "CLASSIC BROCCOLI CHICKEN ALFREDO", description: "Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."},
          {id: 14, name: "CLASSIC BLACKENED SHRIMP ALFREDO", description: "Blackened Shrimp is served warm on a bed of fettucine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley."},
          {id: 15, name: "THREE-CHEESE CHICKEN PENNE", description: "Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes."},
          {id: 16, name: "FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS", description: "A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.)"},
          {id: 17, name: "HAND-BATTERED FISH & CHIPS", description: "Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries."},
  `},
        {"role": "user", "content": "Say this is a test!"}
  
  ],
    "temperature": 0.7
  };
  
  const functions = [
    {
        "name": "getItem",
        "description": "Suggest an Menu Item from this given menu:",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "The menu id of the recommend dish.",
                },
            },
            "required": ["id"],
        },
    }
]

//expected return, list of items user has added to their cart
export const getResponse = async (message) => {
    try {
     const IDresult = await client.post("https://api.openai.com/v1/chat/completions", {
      "model": "gpt-3.5-turbo-0613",
      "messages": [
        { role :  "system" ,  content : `You are a virtual waiter:`},
        {role: "system", content:`Current menu: {id: 1, name:  The Classic Combo , description:   },
        {id: 2, name:  HALF RACK DOUBLE-GLAZED BABY BACK RIBS , description:  Half rack of ribs slow-cooked to fall-off-the-bone tenderness. Slathered with your choice of Honey BBQ sauce or Sweet Asian chile sauce. },
        {id: 3, name:  8 OZ. TOP SIRLOIN , description:  Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides. },
        {id: 4, name:  BOURBON STREET STEAK* , description:  Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides. },
        {id: 5, name:  SHRIMP 'N PARMESAN SIRLOIN* , description:  A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides. },
        {id: 6, name:  CHICKEN TENDERS PLATTER , description:  Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries. },
        {id: 7, name:  FIESTA LIME CHICKEN , description:  A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo. },
        {id: 8, name:  GRILLED CHICKEN BREAST , description:  Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli. },
        {id: 9, name:  BOURBON STREET CHICKEN & SHRIMP , description:  Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes. },
        {id: 10, name:  DOUBLE CRUNCH SHRIMP , description:  Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries. },
        {id: 11, name:  BLACKENED CAJUN SALMON , description:  6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli. },
        {id: 12, name:  HAND-BATTERED FISH & CHIPS , description:  Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries. },
        {id: 13, name:  CLASSIC BROCCOLI CHICKEN ALFREDO , description:  Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley. },
        {id: 14, name:  CLASSIC BLACKENED SHRIMP ALFREDO , description:  Blackened Shrimp is served warm on a bed of fettucine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley. },
        {id: 15, name:  THREE-CHEESE CHICKEN PENNE , description:  Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes. },
        {id: 16, name:  FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS , description:  A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.) },
        {id: 17, name:  HAND-BATTERED FISH & CHIPS , description:  Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries. },
 `},
        {"role": "user", "content": message}],
      
      "temperature": 0.0,
      "functions": functions
     });
    console.log(IDresult);

     const response_message = IDresult["data"]["choices"][0]["message"];
     if (response_message.function_call) {
        const function_name = response_message["function_call"]["name"];
        const function_args = JSON.parse(response_message["function_call"]["arguments"]);
        const id = function_args.id;
        console.log(id);
      }


      const textResponse =  await client.post("https://api.openai.com/v1/chat/completions", {
        "model": "gpt-3.5-turbo-0613",
        "messages": [
          {role : "system" ,  content : `You are a virtual waiter, sell the recommended item using the provided description:`},
          {role: "user", content: message},
          {role : "function" ,  name:"getItem" , content : `name:  HAND-BATTERED FISH & CHIPS , description:  Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries.`}],
        "temperature": 0.7,
        "functions": functions
       });
     const responseText = textResponse.data.choices[0].message.content;
       


     return responseText;
  } catch (err) {
    console.log(err);
  }
}

export const addItemToCart = (item) =>{
    console.log(item);
    return axios.post(`${apiEndpoint}/`, item);
}


