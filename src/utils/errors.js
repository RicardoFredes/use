export function getNotFoundError(resourceName) {
  return new Error(`\`${resourceName}\` não foi encontrado.`);
}
