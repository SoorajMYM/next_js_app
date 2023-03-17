import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React-Next-Meetup</title>
        <meta name="decscription"
        content="this is a react and next js meetup web app"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};
export default HomePage;

// export const getServerSideProps =(context) =>{
//   const req  = context.req
//   const res = context.res

//   return{ props: { meetups: DEMO_ARR } };
// }

export const getStaticProps = async () => {
  const clinet = await MongoClient.connect(
    "mongodb+srv://soorajoffice2000:ivoOr5vCNOh9QvDm@cluster0.iyu3tzy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = clinet.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();
  clinet.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
        key: meetup._id.toString(),
      })),
    },
  };
};
