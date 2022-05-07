if (!process.argv[2]) {
  console.error("You must supply a script name to run.")
  process.exit(-1);
}

const loadScript = async (scriptName) => {
  console.info("Attempting to load script:", scriptName);
  try {
    const script = require(`./scripts/${scriptName}.js`);
    return script;
  } catch (e) {
    console.error("Error:", e.message);
    throw new Error(`Unable to find script with name: ${scriptName}`);
  }
}

const execute = async () => {
  const scriptName = process.argv[2];
  const script = await loadScript(scriptName);
  const scriptParams = process.argv.slice(3, 999);
  await script(scriptParams);
}

execute()
  .catch(err => {
    console.error("Error:", err.message);
    process.exit(-1);
  })
  .finally(() => process.exit(0));
