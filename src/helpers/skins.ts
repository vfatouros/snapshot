const requireFile = require.context(
  '@build-finance/snapshot-spaces/skins/',
  true,
  /[\w-]+\.scss$/
);

requireFile.keys().map(file => requireFile(file));

export default requireFile
  .keys()
  .map(file => file.replace('./', '').replace('.scss', ''));
