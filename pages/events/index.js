import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventsPage = ({ data }) => {
  return data.map((event, index) => (
    <div key={index}>
      <Link href={`/events/${event.id}`} passHref>
        <Image width={300} height={300} src={event.image} alt={event.id} />
        <h2>{event.title}</h2>
      </Link>
    </div>
  ));
};

export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
