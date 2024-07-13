import { InfoCard } from "@/src/components/InfoCard/InfoCard";
import ShowCardEpisodes from "@/src/components/InfoCard/ShowCardEpisodes";
import ShowCardLocation from "@/src/components/InfoCard/ShowCardLocation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { CharacterT } from "@/src/models/character/CharacterT";

const infoProps: CharacterT = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: "Earth",
  episodes: ["1", "2"],
};

const characters = [
  infoProps,
  infoProps,
  infoProps,
  infoProps,
  infoProps,
  infoProps,
  infoProps,
];

export default function Characters() {
  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Characters" />
      <div className="flex flex-wrap justify-around">
        {characters.map((item, i) => (
          <InfoCard key={i} name={item.name} image={item.image}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-white">
              {infoProps.name}
            </h5>
            <ShowCardLocation
              location={infoProps.location}
              classText="group-hover:text-white"
            />
            <ShowCardEpisodes
              episodes={infoProps.episodes}
              classText="group-hover:text-white"
            />
          </InfoCard>
        ))}
      </div>
    </Section>
  );
}
