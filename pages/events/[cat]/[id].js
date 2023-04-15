import Image from "next/image";
import React from "react";

const EventPage = ({ eventData }) => {
  return (
    <div>
      <Image
        src={eventData.image}
        width={1000}
        height={500}
        alt={eventData.title}
      />
      <h1>{eventData.title}</h1>
      <p>{eventData.description}</p>
    </div>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
  const allPaths = allEvents.map((event) => {
    return {
      params: {
        cat: event.city,
        id: event.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const { allEvents } = await import("/data/data.json");
  const eventData = allEvents.find((event) => event.id === id);
  return {
    props: { eventData },
  };
}
