import memberAPI from "@/apis/memberAPI";

const service = new memberAPI();

export async function getMemberProfile() {
  try {
    const res = await service.getMemberProfile();
    if (res.status === 200 && res.member) {
      return res.member;
    } else {
      throw new Error(res.message || "Failed to fetch user profile");
    }
  } catch (err) {
    return undefined;
  }
}
