import { getSupabase } from "./config.js";

const TABLE = "resources";

export async function getAllResources(externalId) {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select("*")
    .eq("external_id", externalId);

  if (error) return {};
  if (!Array.isArray(data)) return {};
  return serializeResources(data);
}

function serializeResources(data) {
  const resources = {};

  for (const i of data) {
    resources[i.name] = {
      queue: resources.queue,
      user: resources.user,
    };
  }

  return resources;
}

export async function getResourceByName(externalId, name) {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select("*")
    .eq("external_id", externalId)
    .eq("name", name)
    .single();

  if (error) return null;
  return data;
}

export async function addResource(externalId, name) {
  const { error } = await getSupabase().from(TABLE).insert({
    external_id: externalId,
    name,
  });

  return !error;
}

export async function updateResourceData(id, user = null, queue = []) {
  await getSupabase()
    .from(TABLE)
    .update({ user, queue })
    .eq("id", id);
}

export async function delResource(id) {
  await getSupabase().from(TABLE).delete().eq("id", id);
}
