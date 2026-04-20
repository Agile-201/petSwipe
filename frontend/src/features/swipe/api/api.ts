import { BACKEND_URL, FRONTEND_URL } from "@/shared/config/api"

interface Pet {
    id: number;
    ounerId: number;
    name: string;
    breed: string;
    photo_url: string;
    description: string;
    age?: number;
}

export async function Like(petId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/swipes/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pet_id : petId,
      }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

export async function Dislike(petId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/swipes/dislike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pet_id : petId,
      }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}


export async function getPetsFeed() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/feed`);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPetById(petId: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pets/${petId}`);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error)
    return null
  }
}