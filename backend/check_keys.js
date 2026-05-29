require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const Home = require("./models/Home");
    const skillData = await Home.findOne({ section: "pageA" });
    if (skillData && skillData.content) {
      console.log("PageA Sections:", skillData.content.map(s => s.sectionTitle));
    } else {
      console.log("No skill data found");
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
