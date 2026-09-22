import { apiGet, apiPost, apiDelete } from "./client";

const BASE = "/audiostories";

async function getAudioStories() {
  return apiGet(BASE);
}

async function getAudioStoryById(id) {
  return apiGet(BASE + "/" + id);
}

async function addAudioStory(audioStoryRequest) {
  return apiPost(BASE, audioStoryRequest);
}

async function deleteAudioStory(id) {
  return apiDelete(BASE + "/" + id);
}

async function searchByDuration(min, max) {
  return apiGet(BASE + "/search/duration?min=" + min + "&max=" + max);
}

export {
  getAudioStories,
  getAudioStoryById,
  addAudioStory,
  deleteAudioStory,
  searchByDuration,
};
