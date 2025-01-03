function calculateRequiredMonsters(totalCards) {
    const possibleCombinations = [];
    for (let fusionLevel = 1; fusionLevel < totalCards; fusionLevel++) {
        const remaining = totalCards - fusionLevel;
        const rank = remaining / 2;
        if (Number.isInteger(rank) && rank > 0 && fusionLevel + rank <= 12) {
            possibleCombinations.push([fusionLevel, rank, rank]);
            if (possibleCombinations.length >= 10) {
                break;
            }
        }
    }
    return possibleCombinations;
}

function findMatchingReturnMonsters(opponentMonsterLevelRank, possibleCombinations) {
    const matchingCombinations = [];
    for (const [fusionLevel, rank1, rank2] of possibleCombinations) {
        if (fusionLevel + rank1 === opponentMonsterLevelRank) {
            matchingCombinations.push([fusionLevel, rank1, rank2]);
            if (matchingCombinations.length >= 10) {
                break;
            }
        }
    }
    return matchingCombinations;
}

document.getElementById('monster-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardsOnPlay = parseInt(document.getElementById('cards_on_play').value);
    const opponentMonsterLevelRank = parseInt(document.getElementById('opponent_monster_level_rank').value);

    if (isNaN(cardsOnPlay) || isNaN(opponentMonsterLevelRank)) {
        alert('Please enter valid numbers for both fields.');
        return;
    }

    const possibleCombinations = calculateRequiredMonsters(cardsOnPlay);
    const matchingCombinations = findMatchingReturnMonsters(opponentMonsterLevelRank, possibleCombinations);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = matchingCombinations.length > 0 ? `<p>Second Effect can be activated! (Banish all cards they controll)</p>` : `<p>No valid combination of <span class="fusion-monster">Fusion Monster</span> and <span class="xyz-monster">Xyz Monsters</span> found to activate the effect.</p>`;
    matchingCombinations.forEach((combination, index) => {
        resultDiv.innerHTML += `<p>Combination ${index + 1}: <span class="fusion-monster">Fusion Monster</span> (Level ${combination[0]}), <span class="xyz-monster">Xyz Monsters</span> (Rank ${combination[1]} and Rank ${combination[2]})</p>`;
    });
});
