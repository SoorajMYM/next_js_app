import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};
export default MeetupDetails;

export const getStaticPaths = async () => {
  const clinet = await MongoClient.connect(
    "mongodb+srv://soorajoffice2000:ivoOr5vCNOh9QvDm@cluster0.iyu3tzy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = clinet.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  clinet.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};
// props side <<<<<<--------------->>>>>>
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const clinet = await MongoClient.connect(
    "mongodb+srv://soorajoffice2000:ivoOr5vCNOh9QvDm@cluster0.iyu3tzy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = clinet.db();
  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  clinet.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};
