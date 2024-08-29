const fileNameToLocaleModuleDict = import.meta.glob("../lang/*.json", {
  eager: true,
});

const messages = {};
Object.entries(fileNameToLocaleModuleDict)
  .map(([fileName, localeModule]) => {
    const fileNameParts = fileName.split("/");
    const fileNameWithoutPath = fileNameParts[fileNameParts.length - 1];
    const localeName = fileNameWithoutPath.split(".json")[0];

    return [localeName, localeModule.default];
  })
  .forEach((localeNameLocaleMessagesTuple) => {
    messages[localeNameLocaleMessagesTuple[0]] =
      localeNameLocaleMessagesTuple[1];
  });

export default messages;
