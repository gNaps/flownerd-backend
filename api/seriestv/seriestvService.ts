import { PrismaClient } from "@prisma/client";
import { UserPrisma } from "../../model/User";
import { seriesTvFilters } from "../../model/SeriesTv";
import axios from "axios";
import {
  TMDB_API_KEY,
  TMDB_API_URL_DETAIL,
  TMDB_API_URL_SEARCH,
  TMDB_IMAGE_URL,
} from "../../utils/utils";

const prisma = new PrismaClient();

const searchSeriesTv = async (filters: seriesTvFilters) => {
  const { name, year } = filters;
  const response = await axios.get(
    `${TMDB_API_URL_SEARCH}?api_key=${TMDB_API_KEY}&query=${name}`
  );

  return response.data;
};

const searchSeriesTvById = async (id: number) => {
  const response = await axios.get(
    `${TMDB_API_URL_DETAIL}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  return response.data;
};

const getSeriestv = async (userId: number, filters?: seriesTvFilters) => {
  const allSeries = await prisma.serietv.findMany({
    where: {
      user_userToserietv: {
        id: userId,
      },
    },
  });

  const response = Promise.all(
    allSeries.map(async (v) => {
      const tmdb = await axios.get(
        `${TMDB_API_URL_DETAIL}/${v.id_external}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const { poster_path, name } = tmdb.data;
      return {
        ...v,
        cover: `${TMDB_IMAGE_URL}${poster_path}`,
        name,
      };
    })
  );

  return response;
};

const getSeriestvByExternalId = async (idExternal: number, userId: number) => {
  const serietv = await prisma.serietv.findFirst({
    where: {
      id_external: idExternal,
      user: userId,
    },
  });

  return serietv;
};

const addSerietv = async (id: number, user: UserPrisma, status: number) => {
  const serietvCreated = await prisma.serietv.create({
    data: {
      id_external: id,
      user_userToserietv: {
        connect: {
          id: +user.id!,
        },
      },
      status: status,
    },
  });

  return serietvCreated;
};

const removeSerietv = async (id: number) => {
  const serietvCreated = await prisma.serietv.delete({
    where: {
      id: id,
    },
  });

  return serietvCreated;
};

const updateSerietv = async (id: number, status: number) => {
  const serietvCreated = await prisma.serietv.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  return serietvCreated;
};

const canModifyCollections = async (serietvId: number, userId: number) => {
  const serietv = await prisma.serietv.findFirst({
    where: {
      id: serietvId,
      user: userId,
    },
  });

  return serietv && serietv.id;
};

export const seriesTvService = {
  searchSeriesTv,
  searchSeriesTvById,
  getSeriestv,
  getSeriestvByExternalId,
  addSerietv,
  updateSerietv,
  removeSerietv,
  canModifyCollections,
};
