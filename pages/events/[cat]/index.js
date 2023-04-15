import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventsCatPage = ({ data, eventCity }) => {
  console.log(data);
  return (
    <div>
      <h1>Events in {eventCity}</h1>
      <div>
        {data.map((event) => (
          <div key={event.id}>
            <Link href={`/events/${event.city}/${event.id}`} passHref>
              <Image
                width={300}
                height={300}
                src={event.image}
                alt={event.id}
              />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const paths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents?.filter(
    (event) => event.city.toLowerCase() === id.toLowerCase()
  );

  return {
    props: { data, eventCity: id },
  };
}
