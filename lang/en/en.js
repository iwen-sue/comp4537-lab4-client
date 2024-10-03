const strings = {
    enterWordToSearch: "Please enter a word to search.",
    enterWordAndDefinition: "Please enter both a word and its definition.",
    definitionOf: (word, definition) => `Definition of "${word}": ${definition}`,
    wordNotFound: (word) => `Word "${word}" not found in the dictionary.`,
    searchError: "An error occurred while searching for the word.",
    wordAdded: (word) => `Word "${word}" successfully added to the dictionary.`,
    wordExists: (word) => `Warning! "${word}" already exists in the dictionary.`,
    addError: "An error occurred while adding the word.",
};

export default strings;
