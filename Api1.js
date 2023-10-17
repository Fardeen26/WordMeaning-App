let btn_1 = document.querySelector(".btn-1");
let url_1 = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let p = document.querySelector("#html_meaning");
let antonP = document.querySelector("#html_antonyms");
let sytonP = document.querySelector("#html_synonyms");
let exmP = document.querySelector("#html_example");

document.addEventListener("keypress", async (e) => {
    if (e.key == "Enter") {
        let inp_1 = document.querySelector(".inp-1");
        let word = inp_1.value;
        let result_1 = await getMeaning(word);
        if (!result_1.length) {
            p.innerHTML = "No information for this word";
            exmP.innerHTML = "";
            antonP.innerHTML = "";
            sytonP.innerHTML = "";
            return 0;
        } else {
            showMeaning(result_1);
        }
        inp_1.value = ""
    }
})
btn_1.addEventListener("click", async () => {
    let inp_1 = document.querySelector(".inp-1");
    let word = inp_1.value;
    let result_1 = await getMeaning(word);
    if (!result_1.length) {
        p.innerHTML = "No information for this word";
        exmP.innerHTML = "";
        antonP.innerHTML = "";
        sytonP.innerHTML = "";
        return 0;
    } else {
        showMeaning(result_1);
    }
    inp_1.value = ""
});

function showMeaning(result_1) {
    p.innerHTML = "";
    exmP.innerHTML = "";
    antonP.innerHTML = "";
    sytonP.innerHTML = "";
    for (result of result_1) {
        let nestedRes = result.meanings[0].definitions;
        nestedRes.length = 5;
        for (res of nestedRes) {
            p.innerHTML += `<li> ${res.definition} </li>`;
        }
    }

    for (exam of result_1) {
        let nestedexm = result.meanings[0].definitions;
        for (exm of nestedexm) {
            if (exm.example == undefined) {
                exmP.innerHTML = "";
            }
            else {
                exmP.innerHTML = "Example: ";
                exmP.innerHTML += `${exm.example}`
                break;
            }
        }
    }
    showAntonyms();
    showSynonyms();
}

function showAntonyms() {
    let nestedexm = result.meanings[0].antonyms;
    if (!nestedexm.length) {
        antonP.innerHTML = " ";
    }
    else {
        antonP.innerHTML = "Antonyms: "
        nestedexm.forEach(element => {
            antonP.innerHTML += `${element}, `
        });
    }
}

function showSynonyms() {
    let nestedexm = result.meanings[0].synonyms;
    if (!nestedexm.length) {
        sytonP.innerHTML = " ";
    }
    else {
        sytonP.innerHTML = "Synonyms: ";
        nestedexm.forEach(element => {
            sytonP.innerHTML += `${element}, `
        });
    }
}

async function getMeaning(word) {
    try {
        let meaning = await axios.get(url_1 + word);
        return meaning.data;
    }
    catch (e) {
        return e;
    }
}


