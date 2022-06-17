//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require('./connection')
const Product = require('./products')
const db = mongoose.connection



//////////////////////////////////////////////
// Data Seed
//////////////////////////////////////////////
db.on("open", () => {
const seedProducts = [
    {name: 'Gym Logo Tee', image: "https://i.postimg.cc/BvTZ9hDV/dojotshirt.jpg", price: 25.00, description: '100% hand spun cotton T shirt. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday T-Shirts', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a tshirt benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Shorts', image: "https://i.postimg.cc/5NSmy1J4/dojostormshorts.jpg", price: 35.00, description: '100% hand spun cotton Grappling Shorts. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Shorts', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself shorts benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Spats', image: "https://i.postimg.cc/fyjYV762/spats-Dojo-Storm.jpg", price: 25.00, description: '100% hand spun cotton Grappling Spats. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Spats', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself spats benefitting the south african garden gnomes', truetosize: true},
    {name: 'Gym Logo Rash Guard', image: "https://i.postimg.cc/6pQCQvzc/rashieds.jpg", price: 30.00, description: '100% hand spun cotton rashguard. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday rashguards', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a rashguard benefitting the south african garden gnomes', truetosize: true},
    {name: 'Gym Hoodie', image: "https://i.postimg.cc/gkzZMh9p/hoodieds.jpg", price: 50.00, description: '100% hand spun cotton Hoodie. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Hoodies', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a Hoodies benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Pants Suit', image: "https://i.postimg.cc/dV7DXm4b/pantsuitds.jpg", price: 125.00, description: '100% hand spun cotton Grappling Pants Suit. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Pants Suit', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a Grappling Pants Suit benefitting the south african garden gnomes', truetosize: true},
]

Product.deleteMany({})
      .then((deletedProducts) => {
        // add the starter fruits
        Product.create(seedProducts)
          .then((newProducts) => {
            // log the new note to confirm their creation
            
            db.close();
          })
          .catch((error) => {
            console.log(error);
            db.close();
          });
      })
      .catch((error) => {
        console.log(error);
        db.close();
      });
  
    /////////////////////////////////////////////
    // Write your Seed Code Above
    ////////////////////////////////////////////
  });