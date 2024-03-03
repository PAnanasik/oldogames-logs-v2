type PlayerVariables = {
  [key: string]: string;
};

type Player = {
  name: string;
  variables: PlayerVariables;
};

type EventData = {
  action: string;
  players: Player[];
};

export default function parseEventDescription(description: string): EventData {
  const playersRegex = /\[(.*?)\]/g;
  const playersMatches = description.match(playersRegex) || [];
  const actionRegex = /\[.*?\](.*?)\[/g;
  const actionMatch = actionRegex.exec(description);
  let action = "";

  if (playersMatches.length === 1) {
    const lastBracketIndex = description.lastIndexOf("]");
    action = description.substring(lastBracketIndex + 1).trim();
  } else if (actionMatch) {
    action = actionMatch[1].trim();
  }

  const playersData = playersMatches.map((playerMatch) => {
    const [playerName, playerVariablesText] = playerMatch
      .slice(1, -1)
      .split("|");
    const variables = getPlayerVariables(playerVariablesText || "");
    return {
      name: playerName,
      variables: variables,
    };
  });

  return {
    action: action,
    players: playersData,
  };
}

function getPlayerVariables(playerText: string): Record<string, string> {
  const variables: Record<string, string> = {};

  // Используем регулярное выражение для поиска пар ключ-значение
  const keyValuePairs = playerText.match(/"([^"]+)"\s*:\s*("[^"]+"|\d+)/g);

  // Проверяем, что переменные найдены
  if (keyValuePairs) {
    // Проходим по каждой паре ключ-значение и добавляем их в объект переменных
    for (const pair of keyValuePairs) {
      const [key, value] = pair
        .split(":")
        .map((part) => part.trim().replace(/"/g, ""));
      variables[key] = value;
    }
  }

  return variables;
}


