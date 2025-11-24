import Image from "next/image";
import { fetchCharacters } from "../lib/fetchCharacters";
import SearchForm from "@/components/search-form/search-form";

export default async function Home() {
  const charactersResponse = await fetchCharacters();
  const characterData = charactersResponse.results;
  const characterNames = characterData.map((character) => character.name)

  if (!characterData.length) {
    return (
      <div className="font-sans flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        Not available characters
      </div>
    );
  }

  return (
    <main className="font-sans min-h-screen bg-neutral-950 p-8 text-white sm:p-12">
      <h1 className="text-center text-3xl font-semibold text-lime-300">Rick & Morty Characters</h1>
      <SearchForm suggestionOptions={characterNames} />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {characterData.map((character) => (
          <li
            key={character.id}
            className="rounded-2xl border border-lime-300/40 bg-neutral-900/60 p-6 shadow-lg shadow-lime-300/10 transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-lime-300/30"
          >
            <Image src={character.image} alt={character.name} width={100} height={100} />
            <p className="text-xl font-medium text-lime-100">{character.name}</p>
            <p className="mt-2 text-sm text-neutral-300">Status: {character.status}</p>
            <p className="text-sm text-neutral-300">Species: {character.species}</p>
            <p className="text-sm text-neutral-300">Gender: {character.gender}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
