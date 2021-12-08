// zobrazení zprávy s typem vstupu
function showMessage(input, message, type) {
	// získání prvku <small> a nastavení zprávy
	const msg = input.parentNode.querySelector("small");
    // aktualizování zprávy
	msg.innerText = message;
	// aktualizování třídy pro vstup
	input.className = type ? "success" : "error";
    // vrácení hodnoty typu
	return type;
}

// funkce zobrazení chybové hlášky
function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

// funkce hasValue() zkontroluje, zda vstupní prvek má hodnotu nebo ne, a podle toho zobrazí chybovou zprávu pomocí funkce showError() nebo showSuccess()
function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

// získání hodnot z formuláře a uložení do proměnných
const form = document.querySelector("#formPokemonId");
const prvniInput = form.elements['prvni-input'];
const druhyInput = form.elements['druhy-input'];

// definování proměnných pro ukládání chybových zpráv
const NAME_REQUIRED = "Prosím zadej jméno pokémona";

// přidání posluchače události odeslání registračního formuláře
form.addEventListener("submit", function (event) {
	// zastavení odesílání formuláře
	event.preventDefault();

	// ověření polí jména
	let nameValid1 = hasValue(form.elements["prvni-input"], NAME_REQUIRED);
    let nameValid2 = hasValue(form.elements["druhy-input"], NAME_REQUIRED);

	let value1 = prvniInput.value;
	let value2 = druhyInput.value;

	// načtení json souboru
	async function getPoke1() {
		let url = `https://pokeapi.co/api/v2/pokemon/${value1}`;
		try {
			let res = await fetch(url);
			return await res.json();
		} catch (error) {
			console.log(error);
		}
	}

	async function getPoke2() {
		let url = `https://pokeapi.co/api/v2/pokemon/${value2}`;
		try {
			let res = await fetch(url);
			return await res.json();
		} catch (error) {
			console.log(error);
		}
	}

	async function renderPoke() {
		let pokemon1 = await getPoke1();
		let pokemon2 = await getPoke2();

		document.getElementById("imgPrvniId").src = pokemon1.sprites.front_shiny;
		document.getElementById("namePrvniId").innerHTML = pokemon1.name;
		document.getElementById("heightPrvniId").innerHTML = 'Výška: ' + pokemon1.height;
		document.getElementById("weightPrvniId").innerHTML = 'Šířka: ' + pokemon1.weight;
		document.getElementById("attackPrvniId").innerHTML = 'Útok: ' + pokemon1.stats[1].base_stat;

		document.getElementById("imgDruhyId").src = pokemon2.sprites.front_shiny;
		document.getElementById("nameDruhyId").innerHTML = pokemon2.name;
		document.getElementById("heightDruhyId").innerHTML = 'Výška: ' + pokemon2.height;
		document.getElementById("weightDruhyId").innerHTML = 'Šířka: ' + pokemon2.weight;
		document.getElementById("attackDruhyId").innerHTML = 'Útok: ' + pokemon2.stats[1].base_stat;

		let attackPoke1 = pokemon1.stats[1].base_stat;    
		let attackPoke2 = pokemon2.stats[1].base_stat;

		if (attackPoke1 > attackPoke2) {
			document.getElementById("vypisPrvniId").classList.add('vitez');
		} else if (attackPoke1 < attackPoke2) {
			document.getElementById("vypisDruhyId").classList.add('vitez');
		} else {
			document.getElementById("vypisPrvniId").classList.add('vitez');
		 	document.getElementById("vypisDruhyId").classList.add('vitez');
		}
	}

	renderPoke();

});

function reset() {
	location.reload();
}