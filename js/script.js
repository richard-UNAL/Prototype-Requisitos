function getSource({ data, value, display }) {
  const database = JSON.parse(localStorage.getItem("database"));
  const dataRetrival = database[data];
  const result = [];
  for (let i = 0; i < dataRetrival.length; i++) {
    result.push({
      value: dataRetrival[i][value],
      text: dataRetrival[i][display],
    });
  }
  return result;
}

// Handler for the import button
function importHandler(instance, resolve) {
  return () => {
    const files = document.getElementById("database-loader").files;
    if (files.length <= 0) {
      alert("No file loaded");
      instance.open();
      return;
    }

    const fr = new FileReader();

    fr.onload = function (e) {
      try {
        const result = JSON.parse(e.target.result);
        resolve(result);
      } catch (e) {
        alert("Error loading database");
        instance.open();
        return;
      }
    };

    fr.readAsText(files.item(0));
  };
}

function downloadButton() {
  return () => {
    const database = JSON.parse(localStorage.getItem("database"));
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(database));
    const dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "database.json");
    dlAnchorElem.click();
  };
}

function onClickCreate(triadaDinamica) {
  return function () {
    const modal = document.getElementById("modal2");
    const title = document.getElementById("modal-title");
    const paragraph = document.getElementById("modal-paragraph");
    const modalForm = document.getElementById("modal-form");
    const buttonForm = document.getElementById("modal-button");
    // Title
    title.innerHTML = triadaDinamica.title;
    // Paragraph
    paragraph.innerHTML = triadaDinamica.paragraph;
    // Empty the inner html
    modalForm.innerHTML = "";

    for (let j = 0; j < triadaDinamica.fields.length; j++) {
      const field = triadaDinamica.fields[j];
      if (field.type === FIELD_TYPE.text) {
        // Create a <div> node
        const div = document.createElement("div");
        div.className = "input-field col s6";

        // <input placeholder="Placeholder" id="first_name" type="text" class="validate">
        const input = document.createElement("input");
        input.id = field.id;
        input.type = "text";
        input.class = "validate";

        // <label for="first_name">First Name</label>
        const label = document.createElement("label");
        label.for = field.id;
        label.innerHTML = field.label;

        div.appendChild(input);
        div.appendChild(label);

        modalForm.appendChild(div);
      } else if (field.type === FIELD_TYPE.select) {
        // Create a <div> node
        const div = document.createElement("div");
        div.className = "input-field col s6";

        const select = document.createElement("select");

        const optionList = getSource(field.source);
        for (let option = 0; option < optionList.length; option++) {
          iterOption = optionList[option];
          const optionElem = document.createElement("option");
          optionElem.value = iterOption["value"];
          optionElem.innerText = iterOption["text"];
          optionElem.id = iterOption["value"];
          select.appendChild(optionElem);
        }
        // <label for="first_name">First Name</label>
        const label = document.createElement("label");
        label.for = field.id;
        label.innerHTML = field.label;

        div.appendChild(select);
        div.appendChild(label);
        modalForm.appendChild(div);
        M.FormSelect.init(select, {});
      }
    }

    buttonForm.onclick = () => {
      const forms = document.querySelector("#modal-form");
      const inputs = forms.querySelectorAll("input");
      const database = JSON.parse(localStorage.getItem("database"));
      const object = {};
      for (let k = 0, len = triadaDinamica.fields.length; k < len; k++) {
        const userInput = inputs[k].value;
        object[triadaDinamica.fields[k].id] = userInput;
      }
      let datumElement = database[triadaDinamica.destination]; // Get the first input
      if (Array.isArray(datumElement)) {
        datumElement.push(object);
      } else {
        datumElement = object;
      }
      database[triadaDinamica.destination] = datumElement;
      localStorage.setItem("database", JSON.stringify(database));
    };
    // Add text to button
    buttonForm.innerText = triadaDinamica.button;

    const instance = M.Modal.getInstance(modal);
    instance.open();
  };
}

function onClickModify(triadaDinamica) {
  return function () {
    const modal = document.getElementById("modal2");
    const title = document.getElementById("modal-title");
    const paragraph = document.getElementById("modal-paragraph");
    const modalForm = document.getElementById("modal-form");
    const buttonForm = document.getElementById("modal-button");
    // Title
    title.innerHTML = triadaDinamica.title;
    // Paragraph
    paragraph.innerHTML = triadaDinamica.paragraph;
    // Empty the inner html
    modalForm.innerHTML = "";

    const database = JSON.parse(localStorage.getItem("database"));
    const possibilities = database[triadaDinamica.destination];

    const divBase = document.createElement("div");
    divBase.className = "input-field col s6";
    const selectPossibilities = document.createElement("select");

    for (let i = 0; i < possibilities.length; i++) {
      let possibility = possibilities[i];
        console.log(possibility);
      const optionElem = document.createElement("option");
      optionElem.value = possibility[triadaDinamica.destination_value];
      optionElem.innerText = possibility[triadaDinamica.destination_value];
      selectPossibilities.appendChild(optionElem);
    }

    const labelPosivility = document.createElement("label");
    // labelPosivility.for = field.id;
    labelPosivility.innerHTML = "Selecciona elemento a modificar";

    divBase.appendChild(selectPossibilities);
    divBase.appendChild(labelPosivility);
    modalForm.appendChild(divBase);
    M.FormSelect.init(selectPossibilities, {});

    // Add text to button
    buttonForm.innerText = triadaDinamica.button;

    const instance = M.Modal.getInstance(modal);
    instance.open();
  };

  // for (let j = 0; j < triadaDinamica.fields.length; j++) {
  //   const field = triadaDinamica.fields[j];
  //   if (field.type === FIELD_TYPE.text) {
  //     // Create a <div> node
  //     const div = document.createElement("div");
  //     div.className = "input-field col s6";

  //     // <input placeholder="Placeholder" id="first_name" type="text" class="validate">
  //     const input = document.createElement("input");
  //     input.id = field.id;
  //     input.type = "text";
  //     input.class = "validate";

  //     // <label for="first_name">First Name</label>
  //     const label = document.createElement("label");
  //     label.for = field.id;
  //     label.innerHTML = field.label;

  //     div.appendChild(input);
  //     div.appendChild(label);

  //     modalForm.appendChild(div);
  //   } else if (field.type === FIELD_TYPE.select) {
  //     // Create a <div> node
  //     const div = document.createElement("div");
  //     div.className = "input-field col s6";

  //     const select = document.createElement("select");

  //     const optionList = getSource(field.source);
  //     for (let option = 0; option < optionList.length; option++) {
  //       iterOption = optionList[option];
  //       const optionElem = document.createElement("option");
  //       optionElem.value = iterOption["value"];
  //       optionElem.innerText = iterOption["text"];
  //       optionElem.id = iterOption["value"];
  //       select.appendChild(optionElem);
  //     }
  //     // <label for="first_name">First Name</label>
  //     const label = document.createElement("label");
  //     label.for = field.id;
  //     label.innerHTML = field.label;

  //     div.appendChild(select);
  //     div.appendChild(label);
  //     modalForm.appendChild(div);
  //     M.FormSelect.init(select, {});
  //   }
  // }
  // };
}

function addClickInput(listDynamic) {
  for (let i = 0; i < listDynamic.length; i++) {
    triadaDinamica = listDynamic[i];
    const triada = document.getElementById(triadaDinamica.id);
    if (triada === null) {
      return;
    }
    if (triadaDinamica.input === MESSAGE_TYPE.input) {
      triada.onclick = onClickCreate(triadaDinamica);
    } else if (triadaDinamica.input === MESSAGE_TYPE.modify) {
      triada.onclick = onClickModify(triadaDinamica);
    }
  }
}

function displayUseCases(listUseCases) {
  for (let i = 0; i < listUseCases.length; i++) {
    const useCase = listUseCases[i];
    const modal = document.getElementById("modal3");
    const title = document.getElementById("modal-image-title");
    const par = document.getElementById("model-image-paragraph");
    const img = document.getElementById("model-image-img");

    console.log(useCase);

    title.innerHTML = " some title";
    par.innerHTML = "some paragraph";
    img.src = "http://www.wallpapers76.com/photo/7551/Cute-Cats-063.jpg";
    const instance = M.Modal.getInstance(modal);
    instance.open();
  }
}

function main() {
  M.AutoInit();
  // Opens the modal window
  const elems = document.querySelectorAll("#modal1");
  const instance = M.Modal.getInstance(elems[0]);
  instance.open();

  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });

  document.getElementById("importBtn").onclick = importHandler(
    instance,
    resolve
  );

  promise.then((loadedDatabase) => {
    localStorage.setItem("database", JSON.stringify(loadedDatabase));
  });

  document.getElementById("tooltipDownload").onclick = downloadButton();

  addClickInput(epIds);
  displayUseCases([]);
}

document.addEventListener("DOMContentLoaded", main);
