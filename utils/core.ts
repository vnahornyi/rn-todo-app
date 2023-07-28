import accessEnv from "../helpers/accessEnv";

/**
 * Checks if the entity is undefined or not
 * @param state - Target entity
 */
export const isUndefined = (state: any): boolean =>
  typeof state === "undefined";

/**
 * Returns version name of the app
 */
export const getAppVersionName = (): string => {
  let version = `v.${accessEnv("MAJOR_VERSION")}.${accessEnv(
    "MINOR_VERSION"
  )}.${accessEnv("PATCH_VERSION")}`;
  if (!isUndefined(accessEnv("PRE_RELEASE", undefined))) {
    version = version.concat(`-${accessEnv("PRE_RELEASE")}`);
  }

  return version;
};
