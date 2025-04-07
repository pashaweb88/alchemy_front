export const parseReferer = (referrer = "") => {
  if (referrer.includes("ref")) {
    return referrer.replace("ref_", "");
  }
  return "";
};
