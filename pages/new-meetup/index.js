import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const NewMeetupPage = () => {
  const router = useRouter();
  const newMeetupHandler = async (enteredDetails) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredDetails),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    return router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add meetup Place </title>
        <meta name="description"
        content="Add meetup place for your own "/>
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />{" "}
    </Fragment>
  );
};
export default NewMeetupPage;
