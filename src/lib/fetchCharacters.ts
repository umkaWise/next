import { CharactersResponse } from "../types/rickAndMorty";

export const fetchCharacters = async (): Promise<CharactersResponse> => {
  const response = await fetch("https://rickandmortyapi.com/api/character");

  if (!response.ok) {
    throw new Error("Failed to load characters");
  }

  return response.json();
};

