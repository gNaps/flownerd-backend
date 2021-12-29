import { PrismaClient } from "@prisma/client";
import { UserPrisma } from "../../model/User";
import apicalypse, { ApicalypseConfig } from "apicalypse";
import { getRequestOptionsIgdb } from "../../utils/utils";
import { videogameFilters } from "../../model/Videogames";

const prisma = new PrismaClient();
const requestOptions: ApicalypseConfig = getRequestOptionsIgdb();

const searchVideogames = async (filters: videogameFilters) => {
  const response = await apicalypse(requestOptions)
    .fields("id,aggregated_rating,cover,cover.url,name,version_parent,category")
    .limit(50)
    .search(filters.name!)
    .where(
      "category = 0 | category = 8 | category = 9 | category = 5 | category = 10"
    )
    .request("/games");

  return response.data;
};

const searchVideogameById = async (id: number) => {
  const response = await apicalypse(requestOptions)
    .fields(
      "id,aggregated_rating,cover,cover.url,genres,genres.name,involved_companies, involved_companies.company.name, involved_companies.company.logo.url,name,platforms, platforms.platform_logo.url,screenshots, screenshots.url,similar_games, similar_games.name, similar_games.cover.url,storyline,summary,remakes, remakes.name, remakes.cover.url,remasters, remasters.name, remasters.cover.url"
    )
    .where(`id = ${id}`)
    .request("/games");

  return response.data;
};

const getVideogames = async (userId: number, filters?: videogameFilters) => {
  const allVideogames = await prisma.videogame.findMany({
    where: {
      user_userTovideogame: {
        id: userId,
      },
    },
  });

  const response = Promise.all(
    allVideogames.map(async (v) => {
      const igdbInfo = await apicalypse(requestOptions)
        .fields("id,cover,cover.url,name")
        .limit(50)
        .where(`id = ${v.id_external}`)
        .request("/games");
      const { cover, name } = igdbInfo.data[0];
      return {
        ...v,
        cover,
        name,
      };
    })
  );

  return response;
};

const getVideogameById = async (id: number) => {
  const videogame = await prisma.videogame.findUnique({
    where: {
      id: id,
    },
  });

  return videogame;
};

const getVideogameByExternalId = async (idExternal: number, userId: number) => {
  const videogame = await prisma.videogame.findFirst({
    where: {
      id_external: idExternal,
      user: userId,
    },
  });

  return videogame;
};

const addVideogame = async (id: number, user: UserPrisma, status: number) => {
  const videogameCreated = await prisma.videogame.create({
    data: {
      id_external: id,
      user_userTovideogame: {
        connect: {
          id: +user.id!,
        },
      },
      status: status,
    },
  });

  return videogameCreated;
};

const removeVideogame = async (id: number) => {
  const videogameCreated = await prisma.videogame.delete({
    where: {
      id: id,
    },
  });

  return videogameCreated;
};

const updateVideogame = async (id: number, status: number) => {
  const videogameCreated = await prisma.videogame.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  return videogameCreated;
};

const canModifyCollections = async (videogameId: number, userId: number) => {
  const videogame = await prisma.videogame.findFirst({
    where: {
      id: videogameId,
      user: userId,
    },
  });

  return videogame && videogame.id;
};

export const videogameService = {
  searchVideogames,
  searchVideogameById,
  getVideogames,
  getVideogameById,
  getVideogameByExternalId,
  addVideogame,
  removeVideogame,
  updateVideogame,
  canModifyCollections,
};
