import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;
    const clinet = await MongoClient.connect(
      "mongodb+srv://soorajoffice2000:ivoOr5vCNOh9QvDm@cluster0.iyu3tzy.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = clinet.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);

    console.log(result)

    clinet.close;

    res.status(201).json({message : "Meetup added successufully !"})
  }
};

export default handler;
