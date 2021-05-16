//run in folder where sources.js is  as $> node sources.js to index files from folder

const fs = require("fs");
const files = fs.readdirSync("./").filter(x => x.includes("png")); 

const ex =
  "{\n" +
  files.map(x =>{
    if(x.indexOf("@") == -1) return `"${x.split(".png")[0]}": require("./${x}"),`
    else return null
  })
  .join("\n")
  .replace(/(\r\n\n|\n\n|\r)/gm, "") +


  "\n\n}" + '\n\n //https://facebook.github.io/react-native/docs/images';;
const res = "export default " + ex;
fs.writeFileSync("./index.js", res);

