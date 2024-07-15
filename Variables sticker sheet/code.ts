figma.showUI(__html__);

interface SimplifiedVariableCollection {
  name: string;
  id: string;
  variableCount: number;
}

const listLocalVariableCollections = async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const formattedCollections: SimplifiedVariableCollection[] = collections.map(collection => ({
    name: collection.name,
    id: collection.id,
    variableCount: collection.variableIds.length // Assuming each collection has a variableIds property
  }));

  figma.ui.postMessage({ type: 'collections', collections: formattedCollections });
};

listLocalVariableCollections();

figma.ui.onmessage = (msg) => {
  if (msg.type === 'resize') {
    figma.ui.resize(400, msg.height);
  }
};